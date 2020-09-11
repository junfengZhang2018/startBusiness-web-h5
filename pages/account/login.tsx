import React, { Component } from "react";
import Router from "next/router"
import api from "@/api";
import util from "@utils";
import Cookies from 'js-cookie'

// 导入antd这个ui组件中的  Tabs, Icon,Form,, Input, Button
import { Form, Input, Button, Tabs, Row, Col, message } from "antd";
import {
    VerticalLeftOutlined,
    TeamOutlined,
    LockOutlined,
    AndroidOutlined,
} from "@ant-design/icons";
import "./login.scss";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// 将用户对象存储到sessionStroage中
// import {setUser} from '../../kits/storageHelper.js'

// 导入注册组件
// import Register from '../../components/account/Register.js'

class Login extends Component {
    formRef = React.createRef();
    // 负责执行登录请求的
    login(){
        this.formRef.current.validateFields().then(value => {
            // if (!err) {
                console.log("Received values of form: ", value);
                // 将values数据通过post请求，发送给/nc/common/account/login
                api.login(value).then(res => {
                    // if (json.status == 1) {
                    //     // 表示服务器处理异常或者用户名和密码错误
                    //     message.error(json.message);
                    // } else {
                    //     // 登录成功以后
                    //     //  1、将用户信息保存到sessionStorage中
                    //     // setUser(json.message.user)
                    //     //  2、跳转到首页  /index
                    //     message.success(json.message.text, 1, () => {
                    //         window.location = "/index";
                    //     });
                    // }
                    console.log(res)
                    // util.setLocal('x-auth-token', res.token);
                    Cookies.set('token', res.token);
                    message.success('登陆成功!', 1, () => {
                        Router.push("/");
                    });
                });
            // }
        }).catch(err => {
            console.log(err)
        });
    }

    logout(){
        Cookies.remove('token')
        message.success("注销成功")
    }

    render() {
        //3.0 布局整个登录页面的样式
        return (
            <div>
                <Row>
                    <Col span="10" offset="7">
                        <Button onClick={() => {this.logout()}}>注销</Button>
                        {/* 3.0.1 利用Tabs去做一个注册和登录的切换功能 */}
                        <Tabs defaultActiveKey="1">
                            <TabPane
                                tab={
                                    <span>
                                        <VerticalLeftOutlined />
                                        登录
                                    </span>
                                }
                                key="1"
                            >
                                <Form
                                    ref={this.formRef}
                                    onFinish={() => {this.login()}}
                                    className="login_form"
                                >
                                    <FormItem
                                        name="telephone"
                                        rules={[
                                            {
                                                required: true,
                                                message: "请输入用户名!",
                                            },
                                            {
                                                pattern: /^1(3|4|5|7|8)\d{9}$/,
                                                message:
                                                    "用户名必须符合手机格式!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            prefix={
                                                <TeamOutlined
                                                    style={{
                                                        color:
                                                            "rgba(0,0,0,.25)",
                                                    }}
                                                />
                                            }
                                            placeholder="请输入手机号"
                                        />
                                    </FormItem>
                                    <FormItem
                                        name="code"
                                        rules={[
                                            {
                                                required: true,
                                                message: "请输入验证码!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            prefix={
                                                <LockOutlined
                                                    style={{
                                                        color:
                                                            "rgba(0,0,0,.25)",
                                                    }}
                                                />
                                            }
                                            placeholder="请输入验证码"
                                        />
                                    </FormItem>
                                    <FormItem>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="login-form-button"
                                        >
                                            登录
                                        </Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        <AndroidOutlined />
                                        注册
                                    </span>
                                }
                                key="2"
                            >
                                {/* 使用注册组件 */}
                                {/* <Register></Register> */}
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <style>
                    {`
                        .ant-form-item{
                            margin: 10px 10px;
                        }
                    `}
                </style>
            </div>
        );
    }
}

// 利用Form.create高阶函数将form对象附加到login组件中的props中
// const WrappedNormalLoginForm = Form.create()(login);

// export default WrappedNormalLoginForm
export default Login;
