// 全局布局组件
import React, { Children, Component } from "react";
import Link from "next/link";
import Router from "next/router";
import api from "@/api";
import "./index.scss";
import {
    Form,
    Input,
    Radio,
    Pagination,
    Button,
    Modal,
    Cascader,
    message,
} from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";

const FormItem = Form.Item;
class Project extends Component<any> {
    formRef = React.createRef();
    state = {
        loading: false,
        visible: false,
        cityList: [],
        industryList: [],
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    submit = () => {
        this.setState({ loading: true });
        this.formRef.current
            .validateFields()
            .then((value) => {
                api.saveProject({
                    ...value,
                    cityId:
                        value.cityId && value.cityId[value.cityId.length - 1],
                    industryId:
                        value.industryId &&
                        value.industryId[value.industryId.length - 1],
                }).then(
                    (res) => {
                        message.success("发布成功");
                        this.setState({ loading: false, visible: false });
                        Router.push("/project");
                    },
                    (err) => {
                        this.setState({ loading: false });
                    }
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    getCity = () => {
        api.getCity({ pid: 0 }).then((res) => {
            this.setState({
                cityList: res.list.map((item) => {
                    return {
                        ...item,
                        isLeaf: false,
                    };
                }),
            });
        });
    };

    getIndustry = () => {
        api.getIndustry({ pid: 0 }).then((res) => {
            this.setState({ industryList: res.list });
        });
    };

    initForm = () => {
        // console.log(this.formRef)
        // this.formRef.current.setFieldsValue({
        //     projectType: 1
        // })
        // console.log(this.formRef.current.getFieldValue())//这里能够获取到初始化挂载的值
    };

    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        api.getCity({ pid: targetOption.id }).then((res) => {
            targetOption.loading = false;
            targetOption.children = res.list;
            this.setState({ cityList: [...this.state.cityList] });
        });
    };

    static async getInitialProps(ctx) {
        let { list, pageInfo }: any = await api.projectList({
            cityId: 0,
            content: "",
            industryId: 0,
            moneyIds: [],
            pageIndex: 1,
            pageSize: 10,
            type: 0,
        });
        return {
            projectList: list,
            pageInfo,
        };
    }
    componentWillMount() {
        // this.initForm();
        this.getCity();
        this.getIndustry();
    }

    render() {
        const { pageInfo, projectList } = this.props.pageProps;
        const { visible, loading } = this.state;
        const { TextArea } = Input;
        const amount = [
            { value: 1, label: "1-50万" },
            { value: 2, label: "50-100万" },
            { value: 3, label: "100-300万" },
            { value: 4, label: "300-500万" },
            { value: 5, label: "500-1000万" },
            { value: 6, label: "1000-5000万" },
            { value: 7, label: "5000万-一亿" },
            { value: 8, label: "一亿以上" },
        ];
        const filter = (arr, value) => {
            let current = arr.find((item) => item.value === value);
            return current && current.label;
        };

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
                                    <a>{item.title}</a>
                                </Link>
                                <p>
                                    <span>
                                        投资资金：
                                        <span className="hot">
                                            {filter(amount, item.money) + "元"}
                                        </span>
                                    </span>
                                </p>
                                <p>
                                    {item.cityName?<span>投资地区：{item.cityName}</span>:''}
                                    {item.industryName?<span>投资行业：{item.industryName}</span>:''}
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
                            onOk={this.submit}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>
                                    返回
                                </Button>,
                                <Button
                                    key="submit"
                                    type="primary"
                                    loading={loading}
                                    onClick={this.submit}
                                >
                                    提交
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
                                    },
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
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={1}>个人</Radio>
                                    <Radio value={2}>公司</Radio>
                                </Radio.Group>
                            </FormItem>
                            <FormItem label="城市" name="cityId">
                                <Cascader
                                    fieldNames={{ label: "name", value: "id" }}
                                    options={this.state.cityList}
                                    loadData={this.loadData}
                                    changeOnSelect
                                />
                            </FormItem>
                            <FormItem label="行业" name="industryId">
                                <Cascader
                                    fieldNames={{ label: "name", value: "id" }}
                                    options={this.state.industryList}
                                    changeOnSelect
                                />
                            </FormItem>
                            <FormItem
                                label="投资金额"
                                name="money"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择投资金额!",
                                    }
                                ]}
                            >
                                <Radio.Group>
                                    {amount.map((item) => (
                                        <Radio
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </Radio>
                                    ))}
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
                                <TextArea
                                    rows={3}
                                    placeholder="请输入项目详情"
                                />
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
