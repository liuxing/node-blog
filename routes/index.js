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
  router.get('/', require('./posts').index)
  router.get('/about', require('./about').index)
  router.get('/user/:username', require('./user').index)
  router.get('/signup', require('./user').signup)
  router.post('/signup', require('./user').signup)
  router.get('/signin', require('./user').signin)
  router.post('/signin', require('./user').signin)
  router.get('/signout', require('./user').signout)
  router.get('/posts/new', isLoginUser, require('./posts').create)
  router.post('/posts/new', isLoginUser, require('./posts').create)
  router.get('/posts', require('./posts').index)
  router.get('/posts/:id', require('./posts').show)
  router.get('/posts/:id/edit', isLoginUser, require('./posts').edit)
  router.post('/posts/:id/edit', isLoginUser, require('./posts').edit)
  router.get('/posts/:id/delete', isLoginUser, require('./posts').destroy)
  router.post('/comments/new', isLoginUser, require('./comments').create)
  router.get('/comments/:id/delete', isLoginUser, require('./comments').destroy)

  app
    .use(router.routes())
    .use(router.allowedMethods())

  // 404
  app.use(async (ctx, next) => {
    await ctx.render('404', {
      title: 'page not find'
    })
  })
}
