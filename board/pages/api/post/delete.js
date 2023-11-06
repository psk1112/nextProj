import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from 'next-auth';

export default async function Delete(request, response) {
    let data = request.body;
    let id = JSON.parse(data);
    let session = await getServerSession(request, response, authOptions);

    if(request.method == "DELETE") {
        try {
            let db = (await connectDB).db('board');
            let findRes = await db.collection('post').findOne({_id : new ObjectId(id)});
            let author = findRes.author;
            if(author == session.user.email){
                let result = await db.collection('post').deleteOne({_id : new ObjectId(id)});
                response.status(200).json({statusCode:200, message: 'DB삭제 완료'});
            }  else{
                response.status(400).json({statusCode:400,  message: '현재유저와 작성자 불일치'});
            } 
        } catch (error) {
            response.status(500).json({ message: '서버 오류' });
        }
    }
}