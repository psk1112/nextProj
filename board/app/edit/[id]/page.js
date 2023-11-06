import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Edit(props) {
    const db = (await connectDB).db("board");
    let result = await db.collection('post')
                         .findOne({_id : new ObjectId(props.params.id)});


    return (
        <div className="p-20">
            <h4>수정페이지</h4>
            <form action="/api/post/edit" method="POST">         
                <input name="title" id="title" defaultValue={result.title}/>
                <input name="content" id="content" defaultValue={result.content}/>
                <input name="_id" id="_id" defaultValue={result._id.toString()} type="hidden"/>
                <button type="submit">전송</button>
                <Link href='/list'> 취소</Link>
            </form>
        </div>
    )
}