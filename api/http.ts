import axios from "axios";
import config from "@/config/url";
import { message } from "antd";
import Loading from "@component/loading";
import util from "@utils";
import Router from "next/router";
/**
 * 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
 */

export const instance = axios.create({
    baseURL: config.baseURL,
    timeout: 30000,
    withCredentials: true, //是否携带cookies发起请求
})

// class Http {
export const http = (url: string, data: object, loading: boolean) => {
    const ifClient = process.browser;
    ifClient && loading && Loading.open();
    return new Promise((resolve, reject) => {
        let _option = {
            method: "POST",
            url,
            data,
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            validateStatus: (status) => {
                return status >= 200 && status < 300;
            },
        };
        // ifClient && (_option.headers['x-auth-token'] = util.getLocal('x-auth-token'));
        instance
            .request(_option)
            .then(
                (res) => {
                    const Data = res.data;
                    if (Data.code == 0 || Data.errCode == 0) {
                        resolve(
                            typeof Data === "object"
                                ? Data.datas
                                : JSON.parse(Data)
                        );
                    } else if (Data.code == 10 || Data.errCode == 10) {
                        Router.push("/account/login");
                    } else {
                        reject(Data);
                        ifClient && message.error(Data.msg || Data.errMsg);
                    }
                },
                (error) => {
                    ifClient && message.error(error.message);
                    if (error.response) {
                        reject(error.response.data);
                    } else {
                        reject(error);
                    }
                }
            )
            .finally(() => {
                ifClient && loading && Loading.close();
            });
    });
}
// }
