'use client'
import { Card, Col, FloatButton, Image, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductList ({id}){
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        async function handleSubmit(){
            
            try {
                const response = await fetch('/api/product/list',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                })
                if(response.status === 200){
                    const data = await response.json();
                    // console.log(data)
                    setProducts(data);
                }

            } catch (error) {
                console.error('상품을 불러오는 중 에러가 발생했습니다:', error);
            }
        }
        handleSubmit();
    }, [id])

    const detailProduct = (product) => {
        window.location.href=`/product/detail/${product.product_seq}`;
    }
    return(
        <div>
            <Row gutter={[8, 16]}>
                {products.map((product) => (
                    <Col span={6} key={product.product_seq}>
                        <Card
                            hoverable
                            style={{
                                width: '100%'
                            }}
                            cover={
                                <div style={{ width: '100%', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img 
                                        alt="example" 
                                        src={`${product.file_path.split('public')[1]}\\${product.new_file_name}`} 
                                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                                    />
                                </div>
                            }
                            onClick={()=>detailProduct(product)}
                        >
                        <Meta title={product.title} description={product.note} />
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontWeight: 'bold'}}>{`${product.price.toLocaleString()} 원`}</p>
                        </div>
                        </Card>
                    </Col>
                ))}
            </Row>  
            <FloatButton.BackTop />
        </div>
    )
}