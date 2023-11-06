import { connectDB } from "@/util/database"

export default async function List(request, response) {
    const db = (await connectDB).db("board")
    let result = await db.collection('post').find().toArray()
    
    return response.status(200).json(result)
}