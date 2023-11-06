import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import moment from 'moment';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const config = {
    api: {
      bodyParser: false
    }
}

export default async function Handler(request, response) {

    let session =await getServerSession(request, response, authOptions);
    let user;
    if(session){
        user = session.user.email;
    }

    if (request.method === 'POST') {

        const form = new IncomingForm();
        const timeStamp = moment().format("YYYY-MM-DD");
        const now = moment().format('YYYYMMDD HH:mm:ss');
        // console.log(timeStamp)
        console.log(now)

        const uploadDir = path.join(process.cwd(), `public/uploads/${timeStamp}`); 

        form.uploadDir = uploadDir;
        form.multiple = true;
        form.keepExtensions = true;

        // console.log(form)
        try {
            await fs.readdir(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, {recursive: true});
        }

        form.parse(request, async (err, fields, files) => {
        
            // 파일 업로드 완료 후 호출되는 콜백
            if (err) {
                console.error('Error uploading files:', err);
                response.status(500).json({ statusCode: 500, message: '파일 업로드 실패' });
            } else {
                for (const file of Object.values(files)) {
                for (const fd of file) {
                    const originalName = fd.originalFilename;
                    const ext = path.extname(originalName);
                    const newFileName = `${fd.newFilename}${ext}`
                    const destPath = path.join(uploadDir, newFileName);
                    // console.log(fd)

                    // 파일 이동 및 이름 변경
                    fs.rename(fd.filepath, destPath)
                    .then(() => {
                        console.log('File moved and renamed:', destPath);
                    })
                    .catch((renameError) => {
                        console.error('Error renaming file:', renameError);
                    });
                    //DB에 저장할 데이터
                    let data = {
                        originalFileName : originalName,
                        newFileName : newFileName,
                        filePath : uploadDir,
                        uploadUser : user,
                        uploadAt : now
                    }

                    const db = (await connectDB).db('board');
                    await db.collection('file').insertOne(data);
                }
                }
                response
                .status(200)
                .json({ statusCode: 200, message: '파일 업로드 성공' });
            }
        });
    }
}
