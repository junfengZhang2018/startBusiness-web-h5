// const config = require('../config/url')

// class FetchHttp {
//     request(url, data) {
//         return new Promise((resolve, reject) => {
//             let _option = {
//                 method: "POST",
//                 timeout: 30000,
//                 body: JSON.stringify(data),
//                 headers: { "Content-Type": "application/json;charset=UTF-8" },
//                 credentials: "include", //是否携带cookies发起请求
//             };
//             fetch(config.baseURL + url, _option).then(async response => {
//                 let res = await response.json();
//                 if (res.errCode === 0) {
//                     resolve(res.datas);
//                 } else {
//                     reject(res);
//                 }
//             }).catch(error => {
//                 reject(error);
//             });
//         })
//     }
// }

// module.exports = new FetchHttp();
