const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertSchema = new Schema({
  // 图片
  photo: {type: String, required: true },
  // 标题
  title: {type: String, required: true },
  // 类型（商品/帖子/网址）
  type: {type: String, required: true },
  // 目标id
  link: {type: String, required: true },
  // 是否应用
  isUsed: { type: Boolean, default: false },
  // 创建时间
  createdAt: {type: Schema.Types.Date, default: new Date() }
});

const advert = mongoose.model('advert', advertSchema);

module.exports = advert;