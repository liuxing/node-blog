const CategoryModel = require('../models/category')

module.exports = {
  async create (ctx, next) {
    if (ctx.method === 'GET') {
      await ctx.render('create_category', {
        title: '新建分类'
      })
      return
    }
    await CategoryModel.create(ctx.request.body)
    ctx.redirect('/category')
  },
  async list (ctx, next) {
    const categories = await CategoryModel.find({})
    await ctx.render('category', {
      title: '新建分类',
      categories
    })
  },
  async edit (ctx, next) {
    if (ctx.method === 'GET') {
      const category = await CategoryModel.findById(ctx.params.id)
      await ctx.render('create_category', {
        title: '编辑分类',
        category
      })
    }
  },
  async destroy (ctx, next) {
    await CategoryModel.findByIdAndRemove(ctx.params.id)
    ctx.flash = { success: '删除分类成功' }
    ctx.redirect('/category')
  }
}
