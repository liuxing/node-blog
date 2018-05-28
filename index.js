const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const views = require('koa-views')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const marked = require('marked')
const flash = require('./middlewares/flash')
const router = require('./routes')
const CONFIG = require('./config/config')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

const app = new Koa()

mongoose.connect(CONFIG.mongodb)

app.keys = ['jszen']

app.use(bodyParser())

app.use(session({
  key: CONFIG.session.key,
  maxAge: CONFIG.session.maxAge
}, app))

app.use(flash())

app.use(serve(
  path.join(__dirname, 'public')
))

app.use(views(path.join(__dirname, 'views'), {
  map: { html: 'nunjucks' }
}))

app.use(async (ctx, next) => {
  ctx.state.ctx = ctx
  ctx.state.marked = marked
  await next()
})

router(app)

app.listen(CONFIG.port)
console.log(`server is running at http://localhost:${CONFIG.port}`)
