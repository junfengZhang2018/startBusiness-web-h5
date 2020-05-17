import React from 'react'
// import css from './styles/header.scss';
import './styles/header.scss';
import { Badge } from 'antd';
import Head from 'next/head'
import { ShoppingCartOutlined } from '@ant-design/icons';

export default class Header extends React.Component {
    render(){
        return (
            <React.Fragment>
                <div className="grey_bg"></div>
                <header className="headtop w">
                    <a href="" className="fl"><img src="/img/asset-logoIco.png" alt="" /></a>
                    <div className="left fl">
                        <a href="/">首页</a>
                        <a href="/about">找资金</a>
                        <a href="">选项目</a>
                    </div>
                    <div className="input fl">
                        <input type="text" className="fl" placeholder="输入查询关键字" />
                        <button className="fr">搜索</button>
                    </div>
                    <div className="right fr">
                        <div className="signin">               
                            <Badge count={5}>
                               {/* 加入antd中的购物车图标 */}
                               {/* <Icon type="shopping-cart" className={css.Icon} /> */}
                               <ShoppingCartOutlined />
                            </Badge>
                            <a onClick={()=>{this.props.onChangeColor('blue')}}>蓝色</a>
                            <a onClick={()=>{this.props.onChangeColor('red')}}>红色</a>
                            {/* <!-- 未登录 -->*/}
                            <a href="#">登录 </a> <span> |</span> <a href="#"> 注册</a>
                            {/* <!-- 登录 --> */}
                            {/* <a href="#" ><Icon type="bell" theme="twoTone" />个人中心</a>
                            <a href="#" ><img src="/static/img/asset-myImg.jpg" alt="" />18665765432</a> */}
                        </div>
                    </div>
                </header>
            </React.Fragment>
        )
    }
}