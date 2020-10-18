// 全局布局组件
import React, { Component } from "react";
import Link from "next/link";
import api from "@/api";
import "./index.scss";
import { EyeOutlined } from "@ant-design/icons";

class ProjectDetail extends Component<any> {
    static async getInitialProps(ctx){
        // console.log(ctx)
        let projectDetail = await api.projectDetail({id: ctx.query.id});
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
            <div className="detail">
                <div className="w">
                    <div className="left">
                        <div className="intro">
                            <div className="title">
                                <p>{projectDetail.title}</p>
                                <div>
                                    <EyeOutlined /> {projectDetail.readCount}
                                    <span className="date">发布日期：{projectDetail.createTime.split(' ')[0]}</span>
                                </div>
                            </div>
                            <div className="introDetail">
                                <p>
                                    {projectDetail.money ? <span>投资资金：{this.investMoneyFilters(projectDetail.money) + "元"}</span>:''}
                                    {projectDetail.timeLimit && <span>投资期限：{projectDetail.timeLimit}</span>}
                                </p>
                                <p>
                                    {projectDetail.cityName?<span>投资地区：{projectDetail.cityName}</span>:''}
                                    {projectDetail.industryName?<span>投资行业：{projectDetail.industryName}</span>:''}
                                </p>
                                <p>
                                    <span>项目类型：{this.projectTypeFilters(projectDetail.projectType)}</span>
                                    <span>股份比例：{projectDetail.stake}</span>
                                </p>
                                <p>
                                    <span>投资意向项目阶段：{this.phaseFilters(projectDetail.phase)}</span>
                                    <span>可提供信息：{projectDetail.stake}</span>
                                </p>
                                {/* <p>
                                    <span className="content">
                                        投资内容：{projectDetail.content}
                                    </span>
                                </p> */}
                            </div>
                        </div>
                        <div className="summarize">
                            <div className="title">
                                <p>投资需求</p>
                            </div>
                            <div>
                                {projectDetail.content}
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="memberProfile">
                            <div className="title">
                                会员简介
                            </div>
                            <div className="content">
                                <p>用户名：{projectDetail.userName || '匿名用户'}</p>
                                <p>用户电话：{projectDetail.userTelephone}</p>
                                <p>感兴趣行业：的空间、打扫房间</p>
                            </div>
                        </div>
                        <div className="recommand">
                            <div className="title">
                                案例推荐
                            </div>
                            <div className="content">
                                <p>用户名：{projectDetail.userName || '匿名用户'}</p>
                                <p>用户电话：{projectDetail.userTelephone}</p>
                                <p>感兴趣行业：的空间、打扫房间</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectDetail