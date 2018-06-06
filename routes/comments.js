const CommentModel = require('../models/comment')

module.exports = {
  async create (ctx, next) {
    const { content } = ctx.request.body
    console.log(content)
    if (!content) {
      ctx.flash = { warning: '评论内容不能为空' }
      ctx.redirect('back')
      return
    }
    const comment = Object.assign(ctx.request.body, {
      from: ctx.session.user._id
    })
    await CommentModel.create(comment)
    ctx.flash = { success: '留言成功' }
    ctx.redirect('back')
  },
  async destroy (ctx, next) {
    const commentId = ctx.params.id
    if (commentId.length !== 24) {
      ctx.throw(404, '评论不存在')
    }
    const comment = await CommentModel.findById(commentId)
    if (!comment) {
      ctx.throw(404, '评论不存在')
    }
    if (comment.from.toString() !== ctx.session.user._id.toString()) {
      ctx.throw(401, '没有权限')
    }
    await CommentModel.findByIdAndRemove(ctx.params.id)
    ctx.flash = { success: '成功删除留言' }
    ctx.redirect('back')
  }
}
