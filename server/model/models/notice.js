const mongoose = require('../mongo');
const Schema = mongoose.Schema;
const user = require('./user');

const userIdValidator = async (val) => {
  return !!await user.findOne({_id: val});
}

const noticeSchema = new Schema({
  // 目标id
  userId: {type: Schema.Types.ObjectId, required: true, validate: userIdValidator},
  // 标题
  title: { type: String, required: true},
  // 封面图
  cover: {type: String, required: true},
  // 内容
  content: {type: String},
  // 状态（是否被查看）
  status: {type: Boolean, default: false},
  // 发布时间
  createdAt: {type: Schema.Types.Date, default: new Date()},
});

const notice = mongoose.model('notice', noticeSchema);

module.exports = notice;