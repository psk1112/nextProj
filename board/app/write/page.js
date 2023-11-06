export default function Write() {
    let date = new Date();
    let createPostAt = date.toLocaleString();
    return (
        <div className="p-20">
        <form action="/api/post/new" method="POST">
            <input name="title" placeholder="글제목"/>
            <input name="content" placeholder="글내용"/>
            <input type="hidden" name="createPostAt" value={createPostAt}/>
            <button type="submit">전송</button>
        </form>
        </div>
    )
}