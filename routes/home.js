const PostModel = require('../models/post')

module.exports = {
  async index (ctx, next) {
    const posts = await PostModel.find({})
    await ctx.render('index', {
      title: 'JS之禅',
      desc: '欢迎关注公众号 JavaScript之禅',
      posts
    })
  }
}
