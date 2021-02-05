const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const settingSchema = new Schema({
});

const setting = mongoose.model('setting', settingSchema);

module.exports = setting;