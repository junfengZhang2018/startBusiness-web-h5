import React from 'react'
import Header from './header'
import { BackTop } from 'antd';
import Footer from './footer';

export default class myLayout extends React.Component<any> {
    render() {
        // 接收_app.js中传入的component和pageProps这两个对象
        const { Component, ...pageProps } = this.props

        return (
            <div>
                {/* 1.0 头部 */}
                <Header></Header>
                {/* 2.0 根据不同请求产生这个请求对应组件中的内容 */}
                <Component {...pageProps} />
                <Footer></Footer>
                <BackTop />
            </div>
        )
    }
}