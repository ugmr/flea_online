const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const userTopicSchema = new Schema({
  // 用户id
  userId: {type: Schema.Types.ObjectId, required: true},
  // 话题id
  targetId: {type: Schema.Types.ObjectId, required: true},
  // 创建时间
  createdAt: {type: Schema.Types.Date, default: new Date()}
});

const userTopic = mongoose.model('user_topic', userTopicSchema);

module.exports = userTopic;