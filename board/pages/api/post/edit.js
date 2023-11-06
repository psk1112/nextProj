import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from 'next-auth';

export default async function Edit(request, response) {
    let data = request.body;
    let editData = {title: data.title, content: data.content}
    let session = await getServerSession(request, response, authOptions);

    if (request.method == 'POST'){
        try {
            let db = (await connectDB).db('board')
            let findRes = await db.collection('post').findOne({_id : new ObjectId(data._id)});
            let author = findRes.author;
            console.log (author)
            console.log (session.user.email)
            if(author == session.user.email){
                let result = await db.collection('post').updateOne(
                             {_id : new ObjectId(data._id)},
                             {$set : editData});
                response.redirect(302, '/list') 
            } else{
                response.status(400).json({statusCode:400,  message: '현재유저와 작성자 불일치'});
            } 
        } catch (error) {
            response.status(500).json({ message: '서버 오류' });
        }
    }
}