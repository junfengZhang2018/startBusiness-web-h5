// 全局布局组件
import React from "react";
import App from "next/app";
import MyLayout from "../layouts/myLayout";
import { instance } from "@/api/http"
import Cookies from '@/utils/cookie'
// 过滤器
import "@/filters"
// redux
import { initStore } from "../store/index";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { saveUserInfo } from "@/store/user/action";
// antd中文
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
// style
import "antd/dist/antd.css";
import util from "@/utils";

class MyApp extends App<any> {
    // 获取到子组件中的prpos对象
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        // 从cookie里获得token并加在头部
        instance.interceptors.request.use(config => {
            if(ctx.isServer){
                config.headers['x-auth-token'] = Cookies.getcookiesInServer(ctx.req).token || '';
            }else{
                config.headers['x-auth-token'] = Cookies.getcookiesInClient('token') || '';
            }
            return config;
        }, error => {
            console.log(error); // for debug
        })
        if (Component.getInitialProps) {
            try{
                pageProps = await Component.getInitialProps(ctx);
            }catch(err){
                ctx.res.end(err);
            }
        }

        return { pageProps };
    }
    componentDidMount(){
        if(util.getLocal('userInfo')) this.props.store.dispatch(saveUserInfo(util.getLocal('userInfo')));
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
                            p{
                                margin-bottom: 0;
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