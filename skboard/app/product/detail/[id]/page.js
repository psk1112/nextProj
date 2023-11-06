import DetailItem from "./DetailItem";

export default function (props){
    const id =  props.params.id;
    return(
        <div>
            <DetailItem id={id}/>
        </div>
    )
}