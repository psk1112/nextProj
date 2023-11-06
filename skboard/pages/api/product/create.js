import { IncomingForm } from 'formidable';
import moment from "moment/moment";
import fs from 'fs/promises';
import path from "path";
import connMariaDB from '@/util/connMariaDB';

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function Create(req, res){
    if(req.method == 'POST'){
        const form = new IncomingForm();
        const timeStamp = moment().format("YYYY-MM-DD");
        const now = moment().format('YYYYMMDD HH:mm:ss');

        const uploadDir = path.join(process.cwd(), `public/uploads/${timeStamp}`); 

        form.uploadDir = uploadDir;
        form.multiple = true;
        form.keepExtensions = true;

        // 디렉토리 없으면 생성
        try {
            await fs.readdir(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, {recursive: true});
        }

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error uploading files:', err);
                res.status(500).json({ statusCode: 500, message: '파일 업로드 실패' });
            } else {
                const connection = await connMariaDB();

                const productData = {
                    kind: fields.kind,
                    title: fields.title,
                    note: fields.note,
                    content: fields.content,
                    price: fields.price,
                    createAt: now
                }

                const productResult = await connection.promise().query('INSERT INTO product (kind, title, note, content, price, created_at) VALUES (?, ?, ?, ?, ?, ?)', [productData.kind, productData.title, productData.note, productData.content, productData.price, productData.createAt]);
                console.log("productResult:::",productResult)
                const productSeq = productResult[0].insertId;

                const fileSeqArray = [];

                for (const file of Object.values(files)) {
                    for (const fd of file) {
                        const originalName = fd.originalFilename;
                        const ext = path.extname(originalName);
                        const newFileName = `${fd.newFilename}${ext}`
                        const destPath = path.join(uploadDir, newFileName);
                        
                        fs.rename(fd.filepath, destPath)
                        .then(() => {
                            console.log('File moved and renamed:', destPath);
                        })
                        .catch((renameError) => {
                            console.error('Error renaming file:', renameError);
                        });

                        const fileData = {
                            originalFileName: originalName,
                            newFileName: newFileName,
                            filePath: uploadDir,
                            uploadAt: now
                        }

                        const fileResult = await connection.promise().query('INSERT INTO file (original_file_name, new_file_name, file_path, upload_at) VALUES (?, ?, ?, ?)', [fileData.originalFileName, fileData.newFileName, fileData.filePath, fileData.uploadAt]);
                        console.log("fileResult:::",fileResult)
                        const fileSeq = fileResult[0].insertId;
                        fileSeqArray.push(fileSeq);
                    }
                }

                for (const fileSeq of fileSeqArray) {
                    await connection.promise().query('INSERT INTO product_image (file_seq, product_seq) VALUES (?, ?)', [fileSeq, productSeq]);
                }
                
                res
                .status(200)
                .json({ statusCode: 200, message: '파일 업로드 및 제품 등록 성공' });
            }
        });
    }
}