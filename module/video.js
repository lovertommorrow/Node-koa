const Router = require('koa-router')
const video = new Router()

// /project
video.get('/', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'project'
    await next()
})
module.exports = video