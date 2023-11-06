'use client'
import Link from "next/link"

export default function ListItem({result, user}) {
    return (
        <div>
            {
                result.map((a, i)=>{
                    const data = a._id;
                    return (
                        <div className="list-item" key={i}>
                            <Link href={`/detail/${result[i]._id}`}>
                                <h4>{result[i].title}</h4>
                            </Link>
                            <p>{result[i].createPostAt}</p>    
                            {
                                result[i].author == user ? <div>
                                                                <Link href={`/edit/${result[i]._id}`}>✏️</Link>
                                                                <span onClick={()=>{
                                                                    fetch('/api/post/delete', {
                                                                        method: 'DELETE',
                                                                        body: JSON.stringify(data) 
                                                                    }).then(response => response.json())
                                                                    .then(result =>{
                                                                        if (result.statusCode === 200){
                                                                            alert(result.message);    
                                                                            window.location.href = "/list"
                                                                        }
                                                                        if (result.statusCode === 400){
                                                                            alert(result.message);
                                                                        }
                                                                    }).catch((error)=>{
                                                                        console.log(error);
                                                                    })
                                                                }}>🗑️</span>                          
                                                            </div>
                                                          : <div></div>       
                            }                                
                        </div>
                    )
                })
            }
        </div>
    )
}