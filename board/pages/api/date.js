export default function DateHandler(request, response) {
    let date = new Date();
    return response.status(200).json(date)
}