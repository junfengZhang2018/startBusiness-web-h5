// 全局布局组件
import React, { Component } from "react";
import Link from "next/link";
import api from "@/api";

class ProjectDetail extends Component {
    static async getInitialProps(ctx){
        let projectDetail = await api.projectDetail({id: ctx.query.id})
        // .then(res => {
        //     console.log(res)
            
        // }, err =>{
        //     console.log(err)
        // })
        return {
            projectDetail
        }
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        const { projectDetail } = this.props.pageProps;
        return (
            <div className="w">
                CCCCCCCCCCCCCC
                {/* <ul>
                    {
                        projectList.map(item => (
                            <li key={item.id}>
                                <Link as={`/detail/${item.id}`} href={`/detail?id=${item.id}`}>
                                    {item.content}
                                </Link>
                            </li>
                        ))
                    }
                </ul> */}
                {projectDetail.advantage}
            </div>
        );
    }
}

export default ProjectDetail