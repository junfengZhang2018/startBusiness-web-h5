// 全局布局组件
import React from "react";
import App from "next/app";
import MyLayout from "../layouts/myLayout";
// redux
import { initStore } from "../store/index";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
// style
import "antd/dist/antd.css";

class MyApp extends App<any> {
    // 获取到子组件中的prpos对象
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }
    
    render() {
        const { Component, store, ...pageProps } = this.props;

        return (
            <React.Fragment>
                <style jsx global>
                    {`
                        #__next {
                            height: 100%;
                        }
                    `}
                </style>
                {/* 改造成利用Layout组件替换此处的Component,将Component组件提取到layout组件中进行执行 */}
                <Provider store={store}>
                    <MyLayout Component={Component} {...pageProps} />
                </Provider>
            </React.Fragment>
        );
    }
}

// 包装MyApp，使得store能够绑定到myapp中的props上
export default withRedux(initStore)(MyApp)