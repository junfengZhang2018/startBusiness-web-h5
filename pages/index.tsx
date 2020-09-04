import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import Head from "next/head";
import { message, Carousel } from "antd";
import { connect } from "react-redux";
// import * as api from "@/server/interface";
import api from "@/api";
import "./index.scss";


// interface UserInterface {
//     name: string;
//     id?: number;
// }

// class User implements UserInterface {
//     constructor(public name: string, public id?: number) {}
//     sayHello(): string {
//         console.log("Hello");
//         return "Hello";
//     }
// }
// const list: Array<User> = [
//     new User("小黑"),
//     new User("小张", 2),
//     new User("小李", 3),
// ];

class Home extends Component<any> {
    // static getInitialProps(ctx){
        
    //     api.projectList({

    //     }).then(res => {
    //         console.log(res)
    //     }, err =>{
    //         console.log(err)
    //     })
    //     console.log(ctx)
    //     return {}
    // }
    componentDidMount(){
    }
    render(){
        return (
            <div className="index">
                <Head>
                    <title>首页</title>
                </Head>
                <style jsx>{``}</style>
                {/* <MyLayout> */}
                {/* <h1>Hello world!My Name is Kun Ho</h1>
                <Link href="/about">
                    <a>11111</a>
                </Link>
                <span onClick={() => {Router.push("/about");}}>
                    hahahah
                </span> */}
                {/* </MyLayout> */}
                {/* <ul>
                    {
                        list.map(item => (
                            <li key={item.id}>
                                <Link as={`/detail/${item.id}`} href={`/detail?id=${item.id}`}>
                                    <a>{item.name}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul> */}
                <Carousel autoplay>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                </Carousel>
                <div className="summary" style={{color: this.props.color}}>1.资金方 2.项目方</div>

                <div className="w">
                    <div className="home-module-1">
                        <div className="investor"></div>
                        <div className="investor"></div>
                        <div className="investor"></div>
                    </div>
                </div>
            </div>
        )
    }
};

export default connect(state => ({
    color: state.homeReducer.color
}))(Home);