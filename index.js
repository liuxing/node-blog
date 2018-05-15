const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const views = require('koa-views')
const router = require('./routes')

const app = new Koa()

app.use(serve(
  path.join(__dirname, 'public')
))

app.use(views(path.join(__dirname, 'views'), {
  map: { html: 'nunjucks' }
}))

router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
