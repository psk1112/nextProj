"use client"

import { useState } from "react"

export default function List(){
    let product = ['Tomatoes', 'Pasta', 'Coconut']
    let [cnt, changeCnt] = useState([0, 0, 0])

    return (
        <div>
            <h4 className="title">상품목록</h4>

            <span>{cnt[0]}</span>
            <button onClick={()=>{
                let copy = [...cnt]
                copy[0]++
                changeCnt(copy)
            }}>+</button>
            <span>{cnt[1]}</span>
            <button onClick={()=>{
                let copy = [...cnt]
                copy[1]++
                changeCnt(copy)
            }}>+</button>
            <span>{cnt[2]}</span>
            <button onClick={()=>{
                let copy = [...cnt]
                copy[2]++
                changeCnt(copy)
            }}>+</button>

            {
                product.map((a,i)=>{
                    return(
                        <div className="food" key={i}>
                            <img src={`/food${i}.png`} className="food-img"/>
                            <h4>{product[i]} $40</h4>
                            <span>{cnt[i]}</span>
                            <button onClick={()=>{ 
                                let copy = [...cnt]
                                copy[i]++
                                changeCnt(copy)
                            }}>+</button>
                            <button onClick={()=>{
                                let copy = [...cnt]
                                copy[i]--
                                changeCnt(copy)
                            }}>-</button>
                        </div>
                    )
                })
            }
        </div>
    )
}