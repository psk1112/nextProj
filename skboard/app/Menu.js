'use client'

import { Badge, ConfigProvider, Menu } from "antd";
import { ShoppingOutlined } from '@ant-design/icons';
import { useState } from "react";
import './globals.css'

export default function MenuHandler(){
    const [current, setCurrent] = useState('');

    const onClick = (e) => {

        setCurrent(e.key);
        const lastArr = e.keyPath.length-1;

        if(e.keyPath[lastArr] == '/'){
            window.location.href=`/`
        }
        if(e.keyPath[lastArr] == 'product'){
            window.location.href=`/product/${e.key}`
        }
        
    };

    const menuStyle={
        color: '#fff',
        backgroundColor: '#26201A',
        width: '100%',
    };

      //----styleEnd
    const items = [
        {
            label: 'TAMBURINS',
            key: '/',
        },
        {
            label: '제품 보기',
            key: 'product',
            children: [
                {
                    label: 'Perfume',
                    key: 'perfume',
                    children: [
                        {
                            label: '퍼퓸',
                            key: 'pf1',
                        },
                        {
                            label: '퍼퓸 밤',
                            key: 'pf2',
                        },
                    ],
                },
                {
                    label: 'Hand Care',
                    key: 'hand',
                    children: [
                            {
                                label: '퍼퓸 핸드',
                                key: 'hd1',
                            },
                            {
                                label: '튜브 핸드',
                                key: 'hd2',
                            },
                            {
                                label: '핸드워시',
                                key: 'hd3',
                            },
                            {
                                label: '손 소독제',
                                key: 'hd4',
                            },
                        ],
                    },
                {
                    label: 'Body Care',
                    key: 'body',
                    children: [
                            {
                                label: '샤워리바디',
                                key: 'bd1',
                            },
                        ],
                    },
                {
                label: 'Home Care',
                key: 'home',
                children: [
                        {
                            label: '토일렛 프래그런스',
                            key: 'hm1',
                        },
                        {
                            label: '올팩티브 캔들',
                            key: 'hm2',
                        },
                        {
                            label: '향 오브젝트',
                            key: 'hm3',
                        },
                    ],
                },
            ],
        },
        {
            label: '베스트셀러',
            key: 'best',
        },
        {
            label: '선물 추천',
            key: 'gift',
        },
        {
            label: '매장 보기',
            key: 'store',
        },
    ];
    const items2 = [
        {
            label: '로그인',
            key: 'login',
        },
        {
            label: '마이페이지',
            key: 'myPage',
        },
        {
            key: 'cart',
            label: (
                <div style={{ position: 'relative', display: 'inline-block'}}>
                    <ShoppingOutlined />
                    <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(80%, -20%)' }}>
                        <Badge count={0} size="small" showZero></Badge>
                    </div>
                </div>
            ),
        },
    ];

    return(
    <ConfigProvider
        theme={{
            components: {
                Menu: {
                    itemHoverColor: '#CAC2BF',
                    itemSelectedColor: '#CAC2BF',
                    horizontalItemHoverColor: '#CAC2BF',
                    horizontalItemSelectedColor: '#CAC2BF',
                    subMenuItemBg: '#EBE7E8',
                    groupTitleColor: '#050B36',
                }
            }
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%'}}>
            <Menu onClick={onClick} selectedKeys={[current]} style={menuStyle} mode='horizontal' items={items}></Menu>
            <div style={{ marginLeft: 'auto', width: '20%' }}>
                <Menu onClick={onClick} selectedKeys={[current]} style={menuStyle} mode='horizontal' items={items2}></Menu>
            </div>
        </div>
    </ConfigProvider>
    )
}