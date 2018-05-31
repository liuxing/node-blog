module.exports = function notFoundHandler () {
  return async (ctx, next) => {
    if (ctx.status === 404) {
      await ctx.render('404', {
        title: 404
      })
    }
  }
}
