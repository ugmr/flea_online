const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  // 标题
  title: { type: String, required: true},
  // 封面图
  cover: {type: String},
  // 内容
  content: {type: String, required: true},
  // 发布时间
  createdAt: {type: Schema.Types.Date, default: new Date()}
});

const announcement = mongoose.model('announcement', announcementSchema);

module.exports = announcement;