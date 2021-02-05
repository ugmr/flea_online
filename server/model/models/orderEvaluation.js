const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const orderEvaluationSchema = new Schema({
  orderId: Schema.Types.ObjectId,
  seller: {
    id: Schema.Types.ObjectId,
    credit: Number,
    content: String,
    photo: Array
  },
  buyer: {
    id: Schema.Types.ObjectId,
    credit: Number,
    content: String,
    photo: Array
  }
});

const orderEvaluation = mongoose.model('orderEvaluation', orderEvaluationSchema);

module.exports = orderEvaluation;