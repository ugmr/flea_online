const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new mongoose.Schema({
  userId: Schema.Types.ObjectId,
  default: Boolean,
  province: String,
  district: String,
  address: String,
  name: String,
  mobile: String
});

const delivery = mongoose.model('delivery', deliverySchema);

module.exports = delivery;