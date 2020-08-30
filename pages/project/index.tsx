// 全局布局组件
import React, { Component } from "react";
import Link from "next/link";
import api from "@/api";

class Project extends Component {
    static async getInitialProps(ctx){
        let projectList = await api.projectList({
            "cityId": 0,
            "content": "",
            "industryId": 0,
            "moneyIds": [],
            "pageIndex": 1,
            "pageSize": 10,
            "type": 0
        })
        // .then(res => {
        //     console.log(res)
            
        // }, err =>{
        //     console.log(err)
        // })
        return {
            projectList: projectList.list,
            // pageInfo: projectList.pageInfo
        }
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        const { pageInfo, projectList } = this.props.pageProps;
        return (
            <div className="w">
                BBBBBBBBB
                <ul>
                    {
                        projectList.map(item => (
                            <li key={item.id}>
                                <Link as={`/project/detail/${item.id}`} href={`/project/detail?id=${item.id}`}>
                                    {item.content}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                {/* {pageInfo} */}
            </div>
        );
    }
}

export default Project