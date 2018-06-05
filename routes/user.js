const bcrypt = require('bcryptjs')
const UserModel = require('../models/user')
const PostModel = require('../models/post')

module.exports = {
  async index (ctx, next) {
    const username = ctx.params.username
    const user = await UserModel.findOne({ name: username })
    if (!user) {
      return ctx.throw(404, '没有该用户')
    }
    const posts = await PostModel.find({ author: user._id }, { content: 0 })
    await ctx.render('user', { user, posts })
  },

  async signin (ctx, next) {
    if (ctx.method === 'GET') {
      await ctx.render('signin', {
        title: '用户登录'
      })
      return
    }
    const { name, password } = ctx.request.body
    const user = await UserModel.findOne({ name })
    if (user && await bcrypt.compare(password, user.password)) {
      ctx.session.user = {
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email
      }
      ctx.flash = { success: '登录成功' }
      ctx.redirect('/')
    } else {
      ctx.body = '用户名或密码错误'
    }
  },

  async signup (ctx, next) {
    if (ctx.method === 'GET') {
      await ctx.render('signup', {
        title: '用户注册'
      })
      return
    }
    const salt = await bcrypt.genSalt(10)
    let { name, email, password } = ctx.request.body
    // TODO 合法性校验
    password = await bcrypt.hash(password, salt)
    const user = {
      name,
      email,
      password
    }
    const result = await UserModel.create(user)
    ctx.body = result
  },

  signout (ctx, next) {
    ctx.session.user = null
    ctx.flash = { warning: '退出登录' }
    ctx.redirect('/')
  }
}
