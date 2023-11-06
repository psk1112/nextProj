'use client'
import { UploadOutlined } from "@ant-design/icons";
import { Button, Cascader, Input, InputNumber, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export default function Write(){
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');
    const [content, setContent] = useState('');
    const [fileList, setFileList] = useState([]);
    
    const options = [
    {
        value: 'Perfume',
        label: 'Perfume',
        children: [
            {
                value: 'pf1',
                label: '퍼퓸',
            },
            {
                value: 'pf2',
                label: '퍼퓸 밤',
            },
        ],
    },
    {
        value: 'Hand Care',
        label: 'Hand Care',
        children: [
            {
                value: 'hd1',
                label: '퍼퓸 핸드',
            },
            {
                value: 'hd2',
                label: '튜브 핸드',
            },
            {
                value: 'hd3',
                label: '핸드워시',
            },
            {
                value: 'hd4',
                label: '손 소독제',
            },
        ],
    },
    {
        value: 'Body Care',
        label: 'Body Care',
        children: [
            {
                value: 'bd1',
                label: '샤워리바디',
            },
        ],
    },
    {
        value: 'Home Care',
        label: 'Home Care',
        children: [
            {
                value: 'hm1',
                label: '토일렛 프래그런스',
            },
            {
                value: 'hm2',
                label: '올팩티브 캔들',
            },
            {
                value: 'hm3',
                label: '향 오브젝트',
            },
        ],
    },
    ];
    const onChange = (value, selectedOptions) => {
        const lastArr = value.length -1;
        setCategory(value[lastArr]);
    };
    const filter = (inputValue, path) =>
        path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

    const upload = async () => {
        const formData = new FormData();
            formData.append('kind', category);
            formData.append('title', title);
            formData.append('note', note);
            formData.append('content', content);
            formData.append('price', price);
            fileList.forEach(file => {
                formData.append('files', file);
            });

            try {
                await fetch('api/product/create', { 
                    method: 'POST', 
                    body: formData
                })
                .then(response=> response.json())
                .then(result=>{
                    if(result.statusCode === 200){
                        alert(result.message)
                        window.location.href = '/';
                    }
                })
            } catch (error) {
                console.error('Error:', error);
            }
    }   
    return(
        <div> 
            <h3>제품 등록</h3>
            <Cascader
                options={options}
                onChange={onChange}
                placeholder="카테고리 선택"
                showSearch={{
                filter,
                }}
                onSearch={(value) => console.log(value)}
            />
            <br/>
            <Upload
                action="/api/product/create"
                listType="picture"
                maxCount={5}
                multiple
                beforeUpload={(file)=>{
                    setFileList(prevFileList => [...prevFileList, file]);
    	            return false;
                }}
                fileList={fileList}
            >
            <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <Input placeholder="제품명" name="title" onChange={(e)=>{setTitle(e.target.value)}}/>
            <InputNumber addonAfter="원" min='0' placeholder="가격" name="price" onChange={value=>{setPrice(value)}}/>
            <Input placeholder="상품설명" name="note" onChange={(e)=>{setNote(e.target.value)}}/>
            <TextArea rows={4} placeholder="상세설명" name="content" onChange={(e)=>{setContent(e.target.value)}}/>
            <Button type="button" onClick={upload}>등록</Button>
        </div>
    )
}