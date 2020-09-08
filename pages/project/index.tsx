// 全局布局组件
import React, { Component } from "react";
import Link from "next/link";
import api from "@/api";
import "./index.scss";
import { Form, Input, Radio, Pagination, Button, Modal } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";

const FormItem = Form.Item;
class Project extends Component<any> {
    formRef = React.createRef();
    state = {
        loading: false,
        visible: true,
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    initForm = () => {
        // console.log(this.formRef)
        // this.formRef.current.setFieldsValue({
        //     projectType: 1
        // })
        // console.log(this.formRef.current.getFieldValue())//这里能够获取到初始化挂载的值
    };

    static async getInitialProps(ctx) {
        let projectList: any = await api.projectList({
            cityId: 0,
            content: "",
            industryId: 0,
            moneyIds: [],
            pageIndex: 1,
            pageSize: 10,
            type: 0,
        });
        // .then(res => {
        //     console.log(res)

        // }, err =>{
        //     console.log(err)
        // })
        return {
            projectList: projectList.list,
            pageInfo: projectList.pageInfo,
        };
    }
    componentDidMount() {
        // this.initForm();
        // this.formRef.current.setFieldsValue({
        //     projectType: 1
        // })
    }
    render() {
        const { pageInfo, projectList } = this.props.pageProps;
        const { visible, loading } = this.state;
        const { TextArea } = Input;
        return (
            <div className="project">
                <div className="w">
                    <div className="publish">
                        <Button type="primary" onClick={this.showModal}>
                            <PlusOutlined />
                            项目发布
                        </Button>
                    </div>
                    <ul className="projectList">
                        {projectList.map((item) => (
                            <li key={item.id}>
                                <Link
                                    as={`/project/detail/${item.id}`}
                                    href={`/project/detail?id=${item.id}`}
                                >
                                    {item.title}
                                </Link>
                                <p>
                                    <span>
                                        投资资金：
                                        <span className="hot">
                                            {item.money + "元"}
                                        </span>
                                    </span>
                                </p>
                                <p>
                                    <span>投资地区：{item.cityName}</span>
                                    <span>投资行业：{item.industryName}</span>
                                </p>
                                <p>
                                    <span>发布用户：{item.userName}</span>
                                    <span>发布时间：{item.createTime}</span>
                                </p>
                                <p>
                                    <span className="content">
                                        投资内容：{item.content}
                                    </span>
                                </p>
                                <div>
                                    <EyeOutlined /> {item.readCount}
                                </div>
                                <div className="deliver">
                                    <Button type="primary">投递</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="page">
                        <Pagination
                            showQuickJumper
                            onShowSizeChange={onShowSizeChange}
                            total={pageInfo.totalRec}
                        />
                    </div>
                    {/* 弹窗 */}
                    <Form
                        ref={this.formRef}
                        // onFinish={() => {
                        //     this.login();
                        // }}
                        className="login_form"
                    >
                        <Modal
                            visible={visible}
                            title="项目发布"
                            width="60%"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>
                                    Return
                                </Button>,
                                <Button
                                    key="submit"
                                    type="primary"
                                    loading={loading}
                                    onClick={this.handleOk}
                                >
                                    Submit
                                </Button>,
                            ]}
                        >

                                <FormItem
                                    label="合作标题"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入合作标题!",
                                        }
                                    ]}
                                >
                                    <Input placeholder="请输入合作标题" />
                                </FormItem>
                                <FormItem
                                    label="项目类型"
                                    name="projectType"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入项目类型!",
                                        }
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value={1}>个人</Radio>
                                        <Radio value={2}>公司</Radio>
                                    </Radio.Group>
                                </FormItem>
                                <FormItem
                                    label="投资金额"
                                    name="money"
                                >
                                    <Radio.Group value={1}>
                                        <Radio value={1}>1-50万</Radio>
                                        <Radio value={2}>50-100万</Radio>
                                        <Radio value={3}>100-300万</Radio>
                                        <Radio value={4}>300-500万</Radio>
                                        <Radio value={5}>500-1000</Radio>
                                        <Radio value={6}>1000-5000万</Radio>
                                        <Radio value={7}>5000-一亿</Radio>
                                        <Radio value={8}>一亿以上</Radio>
                                    </Radio.Group>
                                </FormItem>
                                <FormItem
                                    label="项目详情"
                                    name="content"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入项目详情!",
                                        },
                                    ]}
                                >
                                    <TextArea rows={3} placeholder="请输入项目详情" />
                                </FormItem>
                        </Modal>
                    </Form>
                </div>
            </div>
        );
    }
}

function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
}

export default Project;
