// 全局布局组件
import React from "react";
import App from "next/app";
import MyLayout from "../layouts/myLayout";
import { instance } from "@/api/http"
import Cookies from '@/utils/cookie'
// redux
import { initStore } from "../store/index";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
// antd中文
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
// style
import "antd/dist/antd.css";

class MyApp extends App<any> {
    // 获取到子组件中的prpos对象
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        // console.log(getcookiesInServer(ctx.req))
        instance.interceptors.request.use(config => {
            console.log(config)
            if(ctx.isServer){
                config.headers['x-auth-token'] = Cookies.getcookiesInServer(ctx.req).token || '';
            }else{
                config.headers['x-auth-token'] = Cookies.getcookiesInClient('token') || '';
            }
            
            // if (store.state.token) {
            //     // console.log('token存在') // 如果token存在那么每个请求头里面全部加上token
            //     config.headers['Authorization'] = 'bearer ' + store.state.token
            // }
            console.log(config.headers['x-auth-token'])
            return config
        }, error => {
            console.log(error) // for debug
        })
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
                            >div{
                                min-width: 1300px;
                            }
                        }
                    `}
                </style>
                {/* 改造成利用Layout组件替换此处的Component,将Component组件提取到layout组件中进行执行 */}
                <Provider store={store}>
                    <ConfigProvider locale={zhCN}>
                        <MyLayout Component={Component} {...pageProps} />
                    </ConfigProvider>
                </Provider>
            </React.Fragment>
        );
    }
}

// 包装MyApp，使得store能够绑定到myapp中的props上
export default withRedux(initStore)(MyApp)