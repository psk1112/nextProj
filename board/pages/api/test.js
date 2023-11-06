export default function handler(요청, 응답) {
    if(요청.method == "GET"){
        return 응답.status(200).json('GET 처리 완')
    }
    if(요청.method == "POST"){
        return 응답.status(200).json('POST 처리 완')
    }
}