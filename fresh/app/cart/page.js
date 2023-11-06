import {age, name} from './data.js'
import Hello from './hello.js'

export default function Cart(){
    let itemList = ['Tomatoes', 'Pasta']
    return (
        <div>
            <div>
                <Hello/>
                {age}{name}
            </div>

            <div>
                <h4 className="title">Cart</h4>
                <CartItem item={itemList[0]}/>
                <CartItem item={itemList[1]}/>
                <Banner content="삼성카드"/>
                <Banner content="롯데카드"/>
                <Btn color="blue"/>
                <Btn color="red"/>
            </div>
        </div>
    )
}

function Btn(props){
    return <button type='button' style={{backgroundColor : props.color}}>버튼</button>
}

function Banner(props){
    return <h5>{props.content} 결제 행사중</h5>
}

function CartItem(props){
    return(
        <div className="cart-item">
            <p>{props.item}</p>
            <p>$40</p>
            <p>1개</p>
        </div>
    )
}