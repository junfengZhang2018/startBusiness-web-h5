import React from "react";
import { Badge, Menu, Dropdown, message } from "antd";
import "./styles/footer.scss";
import Head from "next/head";
import util from "@/utils";
import { ShoppingCartOutlined, DownOutlined } from "@ant-design/icons";
// redux步骤1：导入connect高阶函数(react-redux)，按需将store中的state
// 和dispatch注册到当前head组件中来，但是由于head只需要触发事件，所有不需要store中state
import { connect } from "react-redux";
import { changeColor } from "@/store/home/action";
import { clearUserInfo } from "@/store/user/action";
import Cookies from "js-cookie";
import Router from "next/router";

class Footer extends React.Component<any> {
    render() {
        const navList = [{
            title: '网站首页',
            url: ''
        }, {
            title: '服务条款',
            url: ''
        }, {
            title: '隐私政策',
            url: ''
        }, {
            title: '关于我们',
            url: ''
        }, {
            title: '加入我们',
            url: ''
        }]
        return (
            <footer className="wrapper">
                <div id="footer">
                    <div className="contactWay w">
                        <div className="info">
                            <div className="info-wrap">
                                <div className="title tl">联系方式</div>
                                <p>电话：+86 131111111111</p>
                                <p>邮箱：123456@qq.com</p>
                            </div>
                            <div className="info-wrap">
                                <div className="title tl">工作时间</div>
                                <p>09:00 AM ~ 18:00 PM (周一 至 周五)</p>
                                <p>10:00 AM ~ 18:00 PM (周六 与 周日)</p>
                            </div>
                        </div>
                        <div className="weChat">
                            <div className="title">微信服务号</div>
                            <img src="@/assets/images/logo.png" alt="微信服务号" />
                        </div>
                        <div className="partner">
                            <div className="title tr">合作伙伴</div>
                            <img src="@/assets/images/partner.png" alt="" />
                        </div>
                    </div>
                    {/* 版权信息 */}
                    <div className="copyright w">
                        <div className="footer-info">
                            <div className="footer-copyright">© 2021 BosuPost.</div>
                            <div className="footer-links">
                                <ul>
                                    {navList.map(item => (
                                        <li key={item.title}>
                                            <a href={item.url}>
                                                {item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
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

export default Footer;
