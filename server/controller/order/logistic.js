const {order} = require('../../model/models');

// 修改物流信息
const logistic = async (req, res) => {
  const orderId = req.params.id;
  const logistic = req.body.logistic;

  await order.update({orderId: orderId}, {logistic: logistic})

  res.status(203).json({
    status: 'success',
    message: '修改物流信息成功',
  });
};
module.exports = logistic;