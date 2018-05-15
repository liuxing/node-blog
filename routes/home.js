module.exports = {
  async index (ctx, next) {
    await ctx.render('index', {
      title: 'abc-blog',
      desc: '欢迎关注公众号 JavaScript之禅'
    })
  }
}
