'use client'
import {Carousel, ConfigProvider, Image } from "antd"
import './globals.css'
import theme from "@/theme/themeConfig";


export default async function Home() {
  const imgStyle={
    width: '100vw',
    height: '30vw',
    objectFit: 'cover',
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="App">
        <Carousel autoplay dotPosition='top'>
          <div>
            <Image style={imgStyle} src="https://cdn.pixabay.com/photo/2015/12/01/20/28/forest-1072828_640.jpg"></Image>
          </div>
          <div>
            <Image style={imgStyle} src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_640.jpg"></Image>
          </div>
          <div>
            <Image style={imgStyle} src="https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_640.jpg"></Image>
          </div>
          <div>
            <Image style={imgStyle} src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg"></Image>
          </div>
        </Carousel>
      </div> 
    </ConfigProvider>
  )
}
