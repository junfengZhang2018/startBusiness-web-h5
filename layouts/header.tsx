import React from "react";
// import css from './styles/header.scss';
import "./styles/header.scss";
import { Badge, Menu, Dropdown, message } from "antd";
import Head from "next/head";
import util from "@utils";
import { ShoppingCartOutlined, DownOutlined } from "@ant-design/icons";
// redux步骤1：导入connect高阶函数(react-redux)，按需将store中的state
// 和dispatch注册到当前head组件中来，但是由于head只需要触发事件，所有不需要store中state
import { connect } from "react-redux";
import { changeColor } from "@/store/home/action";
import Cookies from "js-cookie";
import Router from "next/router";

const menu = (
    <Menu>
        <Menu.Item>
            <p onClick={() => {logout()}} style={{marginBottom: 0, textAlign: 'center'}}>注销</p>
        </Menu.Item>
    </Menu>
);

const logout = () => {
    Cookies.remove('token');
    util.removeLocal('x-auth-token');
    message.success("注销成功");
}

class Header extends React.Component<any> {
    state = {
        a: 0
    }
    render() {
        const token = util.getLocal('x-auth-token');
        return (
            <React.Fragment>
                <div className="grey_bg"></div>
                <header className="headtop w">
                    <a href="" className="fl">
                        <img src="/img/asset-logoIco.png" alt="" />
                    </a>
                    <div className="left fl">
                        <a href="/">首页</a>
                        <a href="/project">找资金</a>
                        <a href="">选项目</a>
                    </div>
                    <div className="input fl">
                        <input
                            type="text"
                            className="fl"
                            placeholder="输入查询关键字"
                        />
                        <button className="search">搜索</button>
                    </div>
                    <div className="right fr">
                        <div className="signin">
                            <Badge count={5}>
                                {/* 加入antd中的购物车图标 */}
                                <ShoppingCartOutlined />
                            </Badge>
                            <a
                                onClick={() => {
                                    this.props.changeColor("blue");
                                }}
                            >
                                蓝色
                            </a>
                            <a
                                onClick={() => {
                                    this.props.changeColor("red");
                                }}
                            >
                                红色
                            </a>
                            {/* <!-- 未登录 -->*/}
                            {this.state.a == 1 ? (
                                <Dropdown overlay={menu}>
                                    <a
                                        onClick={() => {
                                            Router.push("");
                                        }}
                                    >
                                        13631550213<DownOutlined />
                                    </a>
                                </Dropdown>
                            ) : (
                                <a
                                    onClick={() => {
                                        Router.push("/account/login");
                                    }}
                                >
                                    登录
                                </a>
                            )}

                            {/* <span> |</span>{" "}
                            <a href="#"> 注册</a> */}
                            {/* <!-- 登录 --> */}
                            {/* <a href="#" ><Icon type="bell" theme="twoTone" />个人中心</a>
                            <a href="#" ><img src="/static/img/asset-myImg.jpg" alt="" />18665765432</a> */}
                        </div>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onChangeColor: (color) => {
//             // 利用dispatch去更新store中的state中的color属性(实际上是操作testReducer中的state中的color属性的值)
//             dispatch({ type: "CHANGE_COLOR", color: color });
//         },
//     };
// };

export default connect(null, { changeColor })(Header);
