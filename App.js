const Koa = require('koa')
const app = new Koa()
const fs = require("fs")
const path = require("path")
const static = require('koa-static')

app.use(static(
    path.join( __dirname ,"./static")
))

app.listen(200, () => {
    console.log('200端口已启动')
})
