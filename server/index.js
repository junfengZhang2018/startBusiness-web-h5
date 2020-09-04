const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.use(function (req, res, next) {/*表示匹配任何路由*/
            // console.log(req.headers.cookie)
            next()/*表示匹配完成这个中间件就继续往下执行。*/
        })

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