const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const settingSchema = new Schema({
  name: String,
  domain: String,
  title: String,
  keywords: String,
  description: String,
  copyright: String,
  default: Boolean
});

const setting = mongoose.model('setting', settingSchema);

module.exports = setting;