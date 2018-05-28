const router = require('koa-router')()

async function isLoginUser (ctx, next) {
  console.log(ctx.session)
  if (!ctx.session.user) {
    ctx.flash = { warning: '未登录, 请先登录' }
    return ctx.redirect('/signin')
  }
  await next()
}

module.exports = (app) => {
  router.get('/', require('./home').index)
  router.get('/about', require('./about').index)
  router.get('/signup', require('./user').signup)
  router.post('/signup', require('./user').signup)
  router.get('/signin', require('./user').signin)
  router.post('/signin', require('./user').signin)
  router.get('/signout', require('./user').signout)
  router.get('/posts/new', isLoginUser, require('./posts').create)
  router.post('/posts/new', isLoginUser, require('./posts').create)
  router.get('/posts/:id', require('./posts').show)
  router.get('/posts/:id/edit', isLoginUser, require('./posts').edit)
  router.post('/posts/:id/edit', isLoginUser, require('./posts').edit)
  router.get('/posts/:id/delete', isLoginUser, require('./posts').destroy)

  app
    .use(router.routes())
    .use(router.allowedMethods())
}
