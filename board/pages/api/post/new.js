import { connectDB } from "@/util/database";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Handler(request, response) {
    let session = await getServerSession(request, response, authOptions);

    if (session) {
        request.body.author = session.user.email;
    }
    if(request.method == "POST") {
        let data = request.body;

        if(data.title == '' || data.content == ''){
            return response.status(500).json('왜 안씀?')
        }

        const db = (await connectDB).db('board');
        await db.collection('post').insertOne(data)
        
        return response.redirect(302, '/list')
    }
}