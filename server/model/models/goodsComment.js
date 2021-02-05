const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const goodsCommentSchema = new Schema({
  // 商品id
  id: {type: Schema.Types.ObjectId, required: true},
  // 回复id
  parentId: {type: Schema.Types.ObjectId},
  // 用户id
  userId: {type: Schema.Types.ObjectId, required: true},
  // 评论内容
  content: {type: Schema.Types.String, required: true},
  // 评论时间
  createdAt: {type: Schema.Types.Date, default: true}
});

const goodsComment = mongoose.model('goodsComment', goodsCommentSchema);

module.exports = goodsComment;