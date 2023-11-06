import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import Link from "next/link";
import Comment from "./Comment";

export default async function Detail(props) {
    const db = (await connectDB).db('board');
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})
    let postId= result._id.toString();
  return (
    <div className="p-20">
      <h4>상세페이지</h4>
      <input name="title" id="title" defaultValue={result.title} readOnly/>
      <input name="content" id="content" defaultValue={result.content} readOnly/>
      <Comment postId={postId}/>
      <Link href="/list">[목록으로]</Link>
    </div>
  )
}