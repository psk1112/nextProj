import { connectDB } from '@/util/database';
import fs from 'fs'
import { ObjectId } from 'mongodb';
import path from 'path';

export default async function Handler(request, response){

    const fileId = request.query.id;
    const db = (await connectDB).db('board');
    const data = await db.collection('file').findOne({_id : new ObjectId(fileId)})
    // console.log(fileId)
    const filePath = path.join(data.filePath, data.newFileName)
    // console.log('파일 경로:', filePath);

    const fileStream = fs.createReadStream(filePath);
    // console.log(fileStream)
    
    const encodedFileName = encodeURIComponent(data.originalFileName);
    
    fileStream.on('open', () => {
        response.setHeader('Content-Disposition', `attachment; filename="${encodedFileName}"`);
        fileStream.pipe(response);
    });
    
    fileStream.on('error', (error) => {
        console.error('Error reading file:', error);
        response.status(500).end();
    });

}