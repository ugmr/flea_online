const { order, goods } = require('../../model/models');

// 取消订单
const cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  // 取消订单
  const result = await order.update({_id: orderId}, {
    status: 0
  });
  // 更改商品数量
  await goods.update({_id: result.goodsId}, {
    $inc: { num: result.num}
  });

  //
  res.status(203).json({
    status: 'success',
    message: '取消订单成功',
  });
};
module.exports = cancelOrder;