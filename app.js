const fs = require('fs')
const path = require('path')
const koa = require('koa')
const Router = require('koa-router');
const staticServer = require('koa-static');
 
const app = new koa()
const router = new Router()
//设置静态页面显示
app.use(staticServer(path.join(__dirname, 'public')))

fs.readdirSync(path.join(__dirname, 'module')).reverse().forEach((file)=>{
  console.log(file)
  if(!file.endsWith('.js')){
    return
  }
  //路由匹配：去掉.js，并且'_'替换成'/'
  let module = `/${file.replace(/\.js$/i, '').replace(/_/g, '/')}`
  //console.log(url)
  let question = require(__dirname + '/module/' + file)
  //let question = require(path.join(__dirname, 'module', file))
  
  router.use(module,question.routes(),question.allowedMethods())
})


app.use(router.routes())

app.listen(4000,()=>{
  console.log('4000 port has been start')
});