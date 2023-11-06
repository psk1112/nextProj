import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';

export default async function Handler(request, response) {
    if(request.method == 'POST'){
        try{
            let data = request.body;
            console.log(data)
            let hash = await bcrypt.hash(data.password, 10)
            

            let db = (await connectDB).db('board');
            let result = await db.collection('member').find().toArray();
            let errorMessages = {};
            
            for (let i = 0; i < result.length; i++) {
                if (data.email == result[i].email) {
                    errorMessages.idError = '이미 사용중인 아이디입니다.';
                }
            }
            
            if (data.email == '') {
                errorMessages.idError = '아이디를 입력하세요.';
            }
            
            if (data.password == ''){
                
                errorMessages.passwordError = '비밀번호를 입력하세요.';
            }else if(!data.password == ''){
                data.password = hash
            }
    
            if (Object.keys(errorMessages).length > 0) {
                return response.status(400).json(errorMessages);
            }
        
                await db.collection('member').insertOne(data);
                return response.status(200).json("처리완료");
    
        } catch (error) {
            console.error('에러 발생:', error);
            return response.status(500).json({ error: '서버 오류' });
        }
    }
}