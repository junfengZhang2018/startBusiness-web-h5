/**
 * 全局配置文件
 */
let baseURL;
let imgUrl = "//elm.cangdu.org/img/";
if (process.env.NODE_ENV === "development") {
    baseURL = "http://gu.free.idcfengye.com/cys";
} else {
    baseURL = "//";
}

module.exports = { imgUrl, baseURL };
