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
    if (ctx.session.user) {
      ctx.flash = { warning: '已登录' }
      ctx.redirect('back')
      return
    }
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
      ctx.flash = { warning: '用户名或密码错误' }
      ctx.redirect('back')
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
    let { name, email, password, repassword } = ctx.request.body
    let errMsg = ''
    if (name === '') {
      errMsg = '用户名不能为空'
    } else if (email === '') {
      errMsg = 'email不能为空'
    } else if (password === '') {
      errMsg = '密码不能为空'
    } else if (password !== repassword) {
      errMsg = '两次密码不一样'
    }
    if (errMsg) {
      ctx.flash = { warning: errMsg }
      ctx.redirect('back')
      return
    }
    password = await bcrypt.hash(password, salt)
    const user = {
      name,
      email,
      password
    }
    try {
      const result = await UserModel.create(user)
      ctx.body = result
    } catch (err) {
      if (err.message.match('duplicate key')) {
        ctx.flash = { warning: '用户名已存在' }
      }
      return ctx.redirect('back')
    }
  },

  signout (ctx, next) {
    ctx.session.user = null
    ctx.flash = { warning: '退出登录' }
    ctx.redirect('/')
  }
}
