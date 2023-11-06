import { ConfigProvider } from "antd";

export default function theme () {
    <ConfigProvider
     theme = {{
        token: {
            fontSize: 16,
            colorPrimary: '#52c41a',
        },
    }}>
    </ConfigProvider>
}