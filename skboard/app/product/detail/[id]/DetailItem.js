'use client'
import { Col, Flex, FloatButton, Row } from "antd";
import { useEffect, useState } from "react"
import styles from '@/app/page.module.css'

export default function DetailItem ({id}){
    const [productData, setProductData] = useState({});
    const [fileData, setFileData] = useState([]);
    useEffect(()=>{
        async function handleSubmit(){
            try {
                const response = await fetch('/api/product/detail',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                })
                if(response.status === 200){
                    const { productData, fileData } = await response.json();
                    productData.price = Number(productData.price).toLocaleString();
                    setProductData(productData);
                    setFileData(fileData);
                }
            } catch (error) {
                console.error('상품을 불러오는 중 에러가 발생했습니다:', error);
            }
        }
        handleSubmit();
    },[id])

    return(
        <div>
            {Object.keys(productData).length !== 0 && (
            <Row>
                <Col flex={3}>
                    <div className={styles.scrollbarHidden}>
                        {
                            fileData.map((f) => (
                                <div key={f.file_seq}>
                                    <img src={`${f.file_path.split('public')[1]}\\${f.new_file_name}`}/>
                                </div>
                            ))
                        } 
                    </div>
                </Col>
                <Col flex={2}>
                    <Row justify="center" align="top">
                        <Col span={8}>
                            <div style={{height:'120px', fontSize:'20px', fontWeight:'bold'}}>{productData.title}</div>
                        </Col>
                        <Col span={8}>
                            <div style={{height:'120px'}}>{productData.price}원</div>
                        </Col>
                    </Row>
                    <Row justify="center" align="top">
                        <Col span={16}>   
                            <div style={{height:'80px'}}>
                                <img className={styles.miniImg} src={`${fileData[0].file_path.split('public')[1]}\\${fileData[0].new_file_name}`}/>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" align="top">
                        <Col span={16}>   
                            <div style={{height:'50px', fontWeight:'bold'}}>{productData.note}</div>
                        </Col>
                        <Col span={16}>   
                            <div style={{height:'50px'}}>{productData.content}</div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            )}
            <FloatButton.BackTop />
        </div>
    ) 
}