const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const blacklistSchema = new Schema({
  // 用户id
  fromId: {type: Schema.Types.ObjectId, required: true},
  // 目标id
  toId: {type: Schema.Types.ObjectId, required: true},
  // 互相拉黑
  status: {type: Boolean, required: true},
});

const blacklist = mongoose.model('blacklist', blacklistSchema);

module.exports = blacklist;