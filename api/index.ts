import { http } from './http';

const request = (api, loading = true) => {
    return (data = {}) => {
        return http(api, data, loading);
    };
};

export default {
    login: request("/user/login"), // 登录
    getCity: request("/city/getCity", false), // 获取城市信息
    getIndustry: request("/industry/getIndustry", false), // 获取行业信息
    projectList: request("/project/list"), // 项目信息列表
    projectDetail: request("/project/detail"), // 项目信息详情
    saveProject: request("/project/save"), // 保存项目信息
}