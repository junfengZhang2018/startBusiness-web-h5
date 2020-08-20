import http from './http';

const request = (api, loading = true) => {
    return (data = {}) => {
        return http.request(api, data, loading);
    };
};

export default {
    login: request("/user/login"), // 登录
    projectList: request("/project/list"), // 项目信息列表
}