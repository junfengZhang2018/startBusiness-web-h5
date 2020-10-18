import React, { Component } from "react";
import Router from "next/router"
import api from "@/api";
import util from "@/utils";
import regexList from "@/utils/regexList";
import Cookies from 'js-cookie'
import { connect } from "react-redux";
import { saveUserInfo } from "@/store/user/action";

// 导入antd这个ui组件中的  Tabs, Icon,Form, Input, Button
import { Form, Input, Button, Row, Col, message } from "antd";
import {
    MobileOutlined,
    LockOutlined
} from "@ant-design/icons";
import "./login.scss";

const FormItem = Form.Item;

class Login extends Component<any> {
    formRef = React.createRef<any>();
    // 负责执行登录请求的
    login(){
        this.formRef.current.validateFields().then(value => {
            api.login(value).then(res => {
                util.setLocal('x-auth-token', res.token);
                Cookies.set('token', res.token);
                api.baseInfo().then(res => {
                    this.props.saveUserInfo(res);
                    util.setLocal('userInfo', res);
                    message.success('登录成功!', 1);
                    location.replace("/");
                })
            });
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span="10" offset="9">
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
                                        message: "请输入手机号!",
                                    },
                                    {
                                        pattern: regexList.get('mobile'),
                                        message:
                                            "用户名必须符合手机格式!",
                                    },
                                ]}
                            >
                                <Input
                                    maxLength={11}
                                    prefix={
                                        <MobileOutlined
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
                                    maxLength={6}
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
                    </Col>
                </Row>
                <style>
                    {`
                        .ant-form-item{
                            margin: 10px 10px;
                        }
                        .ant-form-item-control-input-content{
                            text-align: center;
                        }
                    `}
                </style>
            </div>
        );
    }
}

export default connect(null, { saveUserInfo })(Login);
