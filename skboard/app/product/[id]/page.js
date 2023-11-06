import ProductList from "./ProductList";

export default function product(props){

    const id = props.params.id;
    return(
        <div>
            <h1>Product List</h1>
            <ProductList id={id}/>   
        </div>
    )
}