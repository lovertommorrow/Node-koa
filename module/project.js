const Router = require('koa-router')
const project = new Router()

// /project
project.get('/', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'project'
    await next()
})

// project/list
project.get('/list', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'project-list'
    await next()
})
project.post('/update', async (ctx, next) => {
  ctx.response.status = 200
  ctx.response.body = 'project-update'
  await next()
})

module.exports = project