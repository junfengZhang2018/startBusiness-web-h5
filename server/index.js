const express = require('express')
const next = require('next')
const path = require('path')
const getCookie = require('./cookie')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        // server.use(function (req, res, next) {/*表示匹配任何路由*/
        //     // console.log(req.headers.cookie)
        //     let token;
  
        //     if(req) { //req只有在服务端会触发
        //         //当用户第一次进入页面时，会先触发服务端，继续访问其他页面，触发客户端
        //         //F5刷新后，相当于第一次进入页面，触发服务端
        //         //客户端req:undefined
        //         console.log(111)
        //         token = getCookie.getcookiesInServer(req).token || false;
        //         //从服务端获取cookie
        //     } else {
        //         console.log(222)
        //         token = getCookie.getcookiesInClient('token')
        //         //从客户端获取cookie
        //     }
        //     console.log('666',token)
        //     if(!token) {
        //         console.log(333)
        //         return res.redirect('/account/login');
        //         //服务端进行重定向时， 会导致window、sessionStorage这些 全局变量无法使用
        //         //需要使用process.client 判断是否是客户端
        //         //如果在客户端（浏览器），进行重定向则无需
        //     } else {
        //         console.log(444)
        //         // axios.interceptors.request.use(
        //         // config => {
        //         //     config.headers['x-auth-token'] = token  //请求头加上token
        //         //     return config
        //         // },
        //         // err => { return Promise.reject(err) })
        //     }
          
        //     // let middata = await axios.get('http://39.107.226.9/api/user/checkUser');
            
        //     // if(middata.data.status !== 10000) {
        //     //   redirect({ path: '/user/login' });
        //     // }
        //     next()/*表示匹配完成这个中间件就继续往下执行。*/
        // })

        server.get('*', (req, res) => {
            return handle(req, res)
        })
        
        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })