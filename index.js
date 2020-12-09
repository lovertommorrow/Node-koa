/**
 * koa作为node服务的解决方案，
 * 路由 koa-router
 * 协议分析 koa-body koa-body作为Koa的中间件，对文件上传和PSOT JSON,设置josn的大小和文件上传的大小，都比较友好，
 * 跨域 koa-cors
 * 使用中间件要用app.use()这个方法 中间件的加载要有顺序的 所以koaBody放在cors前面
 * 路由的前缀
 * 获取路由请求参数params
 * json pretty json进行格式化换行之类的 字符串转化成json格式 常见的方法 日志 处理
*/

const Koa = require('koa');
const path = require('path')
const Router = require('koa-router');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const json = require('koa-json');
const app = new Koa();
const router = new Router();
router.prefix('/ac/v1')
// static 输入网址显示index.html
const staticServer = require('koa-static');

app.use(staticServer(path.join(__dirname, 'public')))

router.get('/',function (ctx) {
    // console.log(ctx);
    ctx.body = 'hello world';
});
router.get('/api',function (ctx) {
    //get params = ctx.request.query
    const params = ctx.request.query;
    console.log(params);
     //可以处理转发接口等，返回后在做整体数据处理，在返回给前端
    console.log(ctx);
    let aa = {};
    aa.status ='200';
    aa.name = 'cx2';
    ctx.body = aa;
});
router.post('/post', async (ctx) => {
    let { body } = ctx.request; // es6的写法把ctx.request请求体的所有方法都放到body对象里面去
    // console.log(body);
    // console.log(ctx.request);
    let aa = {};
    aa.status ='';
    aa.name = 'cx2';
    ctx.body = aa;

})

app.use(koaBody())
app.use(cors())   
app.use(json({pretty:false, param:'pretty'}));
app.use(router.routes())
    .use(router.allowedMethods())   //把前面所有定义的方法添加到app应用上去

app.listen(3001,()=>{
  console.log('3001 port has been start')
});
//可以封装成不同的模块，比如用户登录模块的，列表模块的中间件，不同模块下使用的api的路径可以不同，然后在全局注册应用。