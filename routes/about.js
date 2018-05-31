module.exports = {
  async index (ctx, next) {
    ctx.body = 'about'
    throw new Error(505)
  }
}
