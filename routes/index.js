const router = require('koa-router')()

module.exports = (app) => {
  router.get('/', require('./home').index)
  router.get('/about', require('./about').index)
  router.get('/signup', require('./user').signup)
  router.post('/signup', require('./user').signup)
  router.get('/signin', require('./user').signin)
  router.post('/signin', require('./user').signin)
  router.get('/signout', require('./user').signout)

  app
    .use(router.routes())
    .use(router.allowedMethods())
}
