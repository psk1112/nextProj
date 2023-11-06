import { connectDB } from "@/util/database";
import FileList from './FileList';

export default async function Filelist() {
    const db = (await connectDB).db("board");
    let result = await db.collection('file').find().toArray();

    return (
        <div>
            <FileList result={result}/>
        </div>
    )
}