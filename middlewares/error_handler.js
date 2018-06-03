module.exports = function errorHandler () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500
      await ctx.render('error', {
        title: ctx.status
      })
      ctx.app.emit('error', err, ctx)
    }
  }
}
