const { orderEvaluation } = require('../model/models');
const { CError, ERROR } = require('../libs/error');

// 获取用户评价
const getByUser = async (req, res) => {
  // 获取参数
  const userId = req.params.id;
  // 查询结果
  const result = await orderEvaluation.findMany({"seller.id": userId},{
    buyer: 1
  });
  // 返回
  res.status(200).json({
    status: 'success',
    message: '获取列表成功',
    data: {
      count: result.length,
      list: result
    }
  });
};
// 获取订单评价
const get = async (req, res) => {
  // 获取参数
  const orderId = req.params.id;
  // 查询结果
  const result = await orderEvaluation.findOne({orderId: orderId});
  // 返回
  res.status(200).json({
    status: 'success',
    message: '获取列表成功',
    data: {
      item: result
    }
  });
};
// 添加评价
const add = async (req, res) => {
  // 获取参数
  const orderId = req.params.id;
  const info = req.body;

  info.orderId = orderId;
  if(info.buyer) info.buyer = JSON.parse(info.buyer);
  if(info.seller) info.seller = JSON.parse(info.seller);

  let result;
  const exist = await orderEvaluation.findOne({orderId: orderId});
  if(exist) {
    result = await orderEvaluation.update(exist._id, info);
  } else {
    result = await orderEvaluation.create(info);
  }
  // 返回
  res.status(201).json({
    status: 'success',
    message: '评价成功',
    data: {
      item: result
    }
  });
};
// 删除评价
const remove = async (req, res) => {
  // 获取参数
  const orderId = req.params.id;
  const type = req.body.type;

  let result;
  const exist = await orderEvaluation.findOne({orderId: orderId});
  if(exist) {
    if(type == 2) {
      await orderEvaluation.remove({_id: exist._id});
    } else {
      if(type == 0) exist.buyer = {};
      else if(type == 1) exist.seller = {};
      await orderEvaluation.replaceById(exist._id, exist);
    }
  }
  // 返回
  res.status(204).end();
}

module.exports = {
  add,
  remove,
  get,
  getByUser
};