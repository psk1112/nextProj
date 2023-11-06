import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from 'next-auth'
import { connectDB } from "@/util/database"
import ListItem from "./ListItem"

export const dynamic = 'force-dynamic'

export default async function List() {
    
    const session = await getServerSession(authOptions);
    let user;
    if(session){
        user = session.user.email;
    }

    const db = (await connectDB).db("board");
    const result = await db.collection('post').find().toArsray();

    return (
        <div className="list-bg">
            <ListItem result={result} user={user}/>
        </div>
    )
}