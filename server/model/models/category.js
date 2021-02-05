const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  // 所属一级分类
  parentId: Schema.Types.ObjectId,
  // 分类名称
  name: {type: String, required: true},
  // 分类封面图
  cover: {type: String, required: true},
  // 分类创建时间
  createdAt: {type: Schema.Types.Date, default: new Date()}
});

const category = mongoose.model('category', categorySchema);

module.exports = category;