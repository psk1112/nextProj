import { connectDB } from '@/util/database'

export default async function Home() {
  
  const client = await connectDB;
  const db = client.db('board')
  let result = await db.collection('post').find().toArray()
  
  return (
    <div>
      <p>메인페이지 입니다</p>
    </div>
  )
}
