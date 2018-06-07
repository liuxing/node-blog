const PostModel = require('../models/post')
const CommentModel = require('../models/comment')
const CategoryModel = require('../models/category')

module.exports = {
  async index (ctx, next) {
    const pageSize = 5
    const currentPage = parseInt(ctx.query.page) || 1
    const cname = ctx.query.c
    let cid
    if (cname) {
      const cateogry = await CategoryModel.findOne({ name: cname })
      if (!cateogry) {
        ctx.throw(404, '该分类不存在')
      }
      cid = cateogry._id
    }
    const query = cid ? { category: cid } : {}
    const allPostsCount = await PostModel.find(query).count()
    const pageCount = Math.ceil(allPostsCount / pageSize)
    const pageStart = currentPage - 2 > 0 ? currentPage - 2 : 1
    const pageEnd = pageStart + 4 >= pageCount ? pageCount : pageStart + 4
    const posts = await PostModel.find(query).sort({ _id: -1 }).skip((currentPage - 1) * pageSize).limit(pageSize)
    const baseUrl = cname ? `${ctx.path}?c=${cname}&page=` : `${ctx.path}?page=`
    await ctx.render('index', {
      title: 'JS之禅',
      posts,
      pageSize,
      currentPage,
      allPostsCount,
      pageCount,
      pageStart,
      pageEnd,
      baseUrl
    })
  },

  async create (ctx, next) {
    if (ctx.method === 'GET') {
      const categories = await CategoryModel.find({})
      await ctx.render('create', {
        title: '新建文章',
        categories
      })
      return
    }
    const { title, content } = ctx.request.body
    let errMsg = ''
    if (title === '') {
      errMsg = '标题不能是空的'
    } else if (content === '') {
      errMsg = '内容不可为空'
    }
    if (errMsg) {
      ctx.flash = { warning: errMsg }
      ctx.redirect('back')
      return
    }
    const post = Object.assign(ctx.request.body, {
      author: ctx.session.user._id
    })
    const res = await PostModel.create(post)
    ctx.flash = { success: '发表文章成功' }
    ctx.redirect(`/posts/${res._id}`)
  },
  async show (ctx, next) {
    const postId = ctx.params.id
    if (postId.length !== 24) {
      ctx.throw(404, '此主题不存在或已被删除')
    }
    const post = await PostModel.findById(postId)
      .populate([
        { path: 'author', select: 'name' },
        { path: 'category', select: ['title', 'name'] }
      ])
    if (!post) {
      ctx.throw(404, '此主题不存在或已被删除')
    }
    const comments = await CommentModel.find({ postId })
      .populate({ path: 'from', select: 'name' })
    await ctx.render('post', {
      title: post.title,
      post,
      comments
    })
  },

  async edit (ctx, next) {
    const postId = ctx.params.id
    if (ctx.method === 'GET') {
      if (postId.length !== 24) {
        ctx.throw(404, '此主题不存在或已被删除')
      }
      const post = await PostModel.findById(postId)
      const categories = await CategoryModel.find({})
      if (!post) {
        ctx.throw(404, '此主题不存在或已被删除')
      }
      if (post.author.toString() !== ctx.session.user._id.toString()) {
        ctx.throw(401, '没有权限')
      }
      await ctx.render('edit', {
        title: '更新文章',
        post,
        categories
      })
      return
    }
    const { title, content, category } = ctx.request.body
    let errMsg = ''
    if (title === '') {
      errMsg = '标题不能是空的'
    } else if (content === '') {
      errMsg = '内容不可为空'
    }
    if (errMsg) {
      ctx.flash = { warning: errMsg }
      ctx.redirect('back')
      return
    }
    await PostModel.findByIdAndUpdate(postId, {
      title,
      content,
      category
    })
    ctx.flash = { success: '更新文章成功' }
    ctx.redirect(`/posts/${ctx.params.id}`)
  },
  async destroy (ctx, next) {
    const postId = ctx.params.id
    if (postId.length !== 24) {
      ctx.throw(404, '此主题不存在或已被删除')
    }
    const post = await PostModel.findById(postId)
    if (!post) {
      ctx.throw(404, '此主题不存在或已被删除')
    }
    if (post.author.toString() !== ctx.session.user._id.toString()) {
      ctx.throw(401, '没有权限')
    }
    await PostModel.findByIdAndRemove(ctx.params.id)
    ctx.flash = { success: '删除文章成功' }
    ctx.redirect('/')
  }
}
