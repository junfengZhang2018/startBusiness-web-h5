// 全局布局组件
import React, { Component } from "react";
import Link from "next/link";
import Router, { withRouter } from "next/router";
import api from "@/api";
import "./index.scss";
import { Form, Input, Radio, Pagination, Button, Modal, Cascader, message, Empty } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import HotTags from '@component/hotTags'

class Business extends Component<any> {
    constructor(props){
        super(props);
        this.getList();
        this.getCity();
        this.getIndustry();
    }
    formRef = React.createRef<any>();
    state = {
        loading: false,
        visible: false,
        currentPage: 1,
        pageSize: 10,
        projectList: [],
        pageInfo: {},
        cityList: [],
        industryList: [],
        selectedCondition: {
            moneyIds: [],
            cityId: '',
            industryId: ''
        }
    };
    showModal = () => {
        this.setState({ visible: true });
    };

    submit = () => {
        this.formRef.current
            .validateFields()
            .then((value) => {
                const { type = 1 } = this.props.router.query;
                this.setState({ loading: true });
                api.saveProject({
                    ...value,
                    type,
                    cityId:
                        value.cityId?.[value.cityId.length - 1],
                    industryId:
                        value.industryId?.[value.industryId.length - 1],
                }).then(
                    (res) => {
                        message.success("发布成功");
                        this.setState({ loading: false, visible: false });
                        Router.reload();
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
        this.formRef.current.resetFields();
    };

    getCity = () => {
        api.getCity({ pid: 0 }).then(res => {
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
        api.getIndustry({ pid: 0 }).then(res => {
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

    changeCondition = (item) => {
        return (state) => {
            this.setState({ selectedCondition: {...this.state.selectedCondition, [item.field]: state.map(val => val[item.keyValue.value])}});
        }
    }

    search(content){
        // console.log(this.state.selectedCondition)
        // console.log(content)
        this.setState({ currentPage: 1 });
        this.getList({
            moneyIds: this.state.selectedCondition.moneyIds,
            industryId: this.state.selectedCondition.industryId[0],
            cityId: this.state.selectedCondition.cityId[0],
            content
        })
    }

    getList = async (params?) => {
        const { type = 1 } = this.props.router.query;
        let data = {
            cityId: 0,
            content: "",
            industryId: 0,
            moneyIds: [],
            pageIndex: 1,
            pageSize: this.state.pageSize,
            type,
            ...params
        }
        let { list, pageInfo }: any = await api.projectList(data);
        this.setState({ projectList: list, pageInfo });
    }

    onPageChange = (pageIndex, pageSize) => {
        this.setState({ currentPage: pageIndex });
        this.getList({
            ...this.state.selectedCondition,
            // content,
            pageIndex
        })
    }

    // static async getInitialProps(ctx) {
    //     let { list, pageInfo }: any = await this.getList(!ctx.isServer&&ctx);
    //     return {
    //         projectList: list,
    //         pageInfo,
    //     };
    // }

    componentWillMount() {
        // this.initForm();
    }

    render() {
        const { type = 1 } = this.props.router.query;
        const { pageInfo, projectList } = this.state;
        const { visible, loading } = this.state;
        const { TextArea } = Input;
        const FormItem = Form.Item;
        const { Search } = Input;
        const contentMap = ['资金需求', '项目详情', '项目详情', '加盟需求'];
        const amount = [
            { value: 1, label: "1-50万" },
            { value: 2, label: "50-100万" },
            { value: 3, label: "100-300万" },
            { value: 4, label: "300-500万" },
            { value: 5, label: "500-1000万" },
            { value: 6, label: "1000-5000万" },
            { value: 7, label: "5000万-一亿" },
            { value: 8, label: "一亿以上" }
        ];
        const projectType = [
            { value: 1, label: "个人" },
            { value: 2, label: "公司" }
        ];
        const condition = [
            {type: '投资金额', data: amount, field: 'moneyIds', keyValue: {key: 'label', value: 'value'}},
            {type: '投资城市', data: this.state.cityList, field: 'cityId', keyValue: {key: 'name', value: 'id'}},
            {type: '投资行业', data: this.state.industryList, field: 'industryId', keyValue: {key: 'name', value: 'id'}}
        ];
        const rules = {
            title: [
                {
                    required: true,
                    message: "请输入合作标题!",
                }
            ],
            projectType: [
                {
                    required: true,
                    message: "请输入项目类型!",
                }
            ],
            money: [
                {
                    required: true,
                    message: "请选择投资金额!",
                }
            ],
            content: [
                {
                    required: true,
                    message: `请输入${contentMap[type-1]}!`,
                }
            ],
            advantage: [
                {
                    required: true,
                    message: "请输入您的优势!",
                }
            ],
        };
        
        return (
            <div className="project">
                <div className="w">
                    <div className="publish">
                        <Button type="primary" onClick={this.showModal}>
                            <PlusOutlined />
                            需求发布
                        </Button>
                    </div>
                    <div className="filter">
                        <div className="title">筛选</div>
                        <div className="condition">
                            {
                                condition.map((item, index) => {
                                    if((type == 3 || type == 4) && !index) return;
                                    else return (
                                        <HotTags key={item.type} data={item} onChange={this.changeCondition(item)} />
                                    )
                                })
                            }
                            <Search placeholder="在当前条件下搜索" onSearch={value => this.search(value)} enterButton />
                        </div>
                    </div>
                    <ul className="projectList">
                        {projectList && projectList.length > 0 ? projectList.map((item) => (
                            <li key={item.id}>
                                <a href={`/business/detail?id=${item.id}`}>{item.title}</a>
                                {(type == 1 || type == 2) && <p>
                                    <span>
                                        投资资金：
                                        <span className="hot">
                                            {this.investMoneyFilters(item.money) + "元"}
                                        </span>
                                    </span>
                                </p>}
                                <p>
                                    {item.cityName && <span>投资地区：{item.cityName}</span>}
                                    {item.industryName && <span>投资行业：{item.industryName}</span>}
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
                        )) : <Empty />}
                    </ul>
                    <div className="page">
                        {pageInfo.totalRec ? <Pagination
                            showQuickJumper
                            current={this.state.currentPage}
                            defaultCurrent={1}
                            onChange={this.onPageChange}
                            total={pageInfo.totalRec}
                        /> : null}
                    </div>
                    {/* 弹窗 */}
                    <Form ref={this.formRef}>
                        <Modal
                            visible={visible}
                            title="需求发布"
                            width="40%"
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
                                label="标题"
                                name="title"
                                rules={rules.title}
                            >
                                <Input placeholder="请输入标题" />
                            </FormItem>
                            <FormItem
                                label="项目类型"
                                name="projectType"
                                rules={rules.projectType}
                            >
                                <Radio.Group>
                                    {projectType.map((item) => (
                                        <Radio
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </FormItem>
                            <FormItem label="城市" name="cityId" className="half">
                                <Cascader
                                    fieldNames={{ label: "name", value: "id" }}
                                    options={this.state.cityList}
                                    loadData={this.loadData}
                                    changeOnSelect
                                />
                            </FormItem>
                            <FormItem label="行业" name="industryId" className="half">
                                <Cascader
                                    fieldNames={{ label: "name", value: "id" }}
                                    options={this.state.industryList}
                                    changeOnSelect
                                />
                            </FormItem>
                            {(type == 1 || type == 2) && <FormItem
                                label="投资金额"
                                name="money"
                                rules={rules.money}
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
                            </FormItem>}
                            <FormItem
                                label={contentMap[type-1]}
                                name="content"
                                rules={rules.content}
                            >
                                <TextArea
                                    rows={3}
                                    placeholder={`请输入${contentMap[type-1]}`}
                                />
                            </FormItem>
                            {type == 3 && <FormItem
                                label="您的优势"
                                name="advantage"
                                rules={rules.advantage}
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="请输入您的优势"
                                />
                            </FormItem>}
                        </Modal>
                    </Form>
                </div>
            </div>
        );
    }
}


export default withRouter(Business);
