module.exports = {
  async index (ctx, next) {
    await ctx.render('index', {
      title: 'JS之禅',
      desc: '欢迎关注公众号 JavaScript之禅'
    })
  }
}
