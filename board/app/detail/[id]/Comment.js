'use client'
import { useEffect, useState } from "react"

export default function Comment(props){
    let [comment, setComment] = useState('');
    let [data, setData] = useState([]);

    useEffect(()=>{
        fetch('/api/comment/list?id='+props.postId)
        .then(response => response.json())
        .then(result =>{
            setData(result);
        });
    }, [comment, props.postId]);
    return(
        <div>
            <div>댓글목록</div>
            
            { 
                data.length > 0 ? 
                    data.map((a,i)=>{
                                return(
                                    <div key={i}>
                                        <p>{a.author}</p>
                                        <p>{a.comment}</p>
                                    </div>
                                )
                            })
                    : '댓글없음'
            }
            
            <input onChange={(e)=>{setComment(e.target.value)}} value={comment}/>
            <button onClick={()=>{
                let newData = {parents: props.postId,
                            comment: comment 
                           };
                    fetch('/api/comment/new', {
                        method:'POST', 
                        body: JSON.stringify(newData) 
                    }).then(response => response.json())
                    .then(result => {
                        setData([...data, result])
                        setComment('');
                    })
                }}>댓글전송</button>
      </div>
    )
}