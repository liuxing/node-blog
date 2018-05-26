const PostModel = require('../models/post')

module.exports = {
  async create (ctx, next) {
    if (ctx.method === 'GET') {
      await ctx.render('create', {
        title: '新建文章'
      })
      return
    }
    const post = Object.assign(ctx.request.body, {
      author: ctx.session.user._id
    })
    const res = await PostModel.create(post)
    ctx.body = res
  },
  async show (ctx, next) {
    const post = await PostModel.findById(ctx.params.id)
    await ctx.render('post', {
      title: post.title,
      post
    })
  },
  async edit () {

  },
  async destroy () {

  }
}
