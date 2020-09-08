/**
 * 全局配置文件
 */
let baseURL;
let imgUrl = "//elm.cangdu.org/img/";
if (process.env.NODE_ENV === "development") {
    baseURL = "http://192.168.41.1:8085/cys";
    // baseURL = "http://t33856023a.qicp.vip/cys";
} else {
    baseURL = "//";
}

export default { imgUrl, baseURL };
