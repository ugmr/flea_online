const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const collectSchema = new Schema({
  // 用户id
  userId: {type: Schema.Types.ObjectId, required: true},
  // 商品id
  targetId: {type: Schema.Types.ObjectId, required: true},
  // 收藏时间
  createdAt: {type: Schema.Types.Date, default: new Date()}
});

const collect = mongoose.model('collect', collectSchema);

module.exports = collect;