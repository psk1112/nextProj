'use client'

import { useState } from "react";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";

export default function StyledComponentsRegistry ({children}){
    const [cache] = useState(()=> createCache());

    useServerInsertedHTML(() => {
        return (
            <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
        )
    })
    
    return <StyleProvider cache={cache}>{children}</StyleProvider>;
}