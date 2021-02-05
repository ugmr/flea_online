const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  // 用户id
  userId: {type: Schema.Types.ObjectId, required: true},
  // 目标id
  targetId: {type: Schema.Types.ObjectId, required: true},
  // 类型
  type: {type: String, required: true},
  // 举报信息
  content: {type: String, required: true},
  // 图片
  photo: {type: String},
  // 已处理
  status: {type: Boolean, default: false},
  // 创建时间
  createdAt: {type: Schema.Types.Date, default: new Date()},
});

const report = mongoose.model('report', reportSchema);

module.exports = report;