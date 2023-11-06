import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Handler(request, response){
    
    if(request.method == 'GET'){
        let db = (await connectDB).db('board');
        const comments = await db.collection('comment').find({parents : new ObjectId(request.query.id)}).toArray();
        
        return response.status(200).json(comments);
    }
}