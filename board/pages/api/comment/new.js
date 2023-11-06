import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function Handler(request, response) {
    let session = await getServerSession(request, response, authOptions);
    if(request.method == 'POST'){
        try{
            request.body = JSON.parse(request.body);
                let data = {
                    comment : request.body.comment,    
                    parents : new ObjectId(request.body.parents),
                    author : session.user.email
                };
            
                let db = (await connectDB).db('board');
                await db.collection('comment').insertOne(data);
                const comments = await db.collection('comment').find({parents : new ObjectId(request.query.id)}).toArray();

            return response.status(200).json(comments);
        }catch(error){

        }
    }
}