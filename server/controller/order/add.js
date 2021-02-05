const { order, delivery, goods } = require('../../model/models');
const {CError, ERROR} = require('../../libs/error');
// 下单
const placeOrder = (my) => {
  return async (req, res) => {
    const info = req.body;

    if(my) {
      info.buyer = req.token.id;
    }
    if(!info.num) throw new CError(ERROR.FORMAT_INVALID, '商品数量不能为空');
    // 查询商品库存
    const g = await goods.findOne({_id: info.goodsId});
    if(!g) throw new CError(ERROR.DATA_NOT_FOUND, '商品不存在');
    if(g.num < info.num) {
      res.status(200).json({
        status: 'fail',
        message: '商品库存不足'
      });
    }
    await goods.update(info.goodsId, {num: g.num - info.num});

    info.goodsName = g.name;
    info.cover = g.cover;
    info.goodsPrice = g.price;
    info.freight = g.freight;
    info.seller = g.userId;
    info.price = info.goodsPrice + info.freight;

    const deli = await delivery.findOne({_id: info.delivery});
    if(!deli) throw new CError(ERROR.FORMAT_INVALID, '用户地址格式错误');
    info.delivery = {
      mobile: deli.name,
      name: deli.name,
      province: deli.province,
      district: deli.district,
      address: deli.address
    };

    const result = await order.create(info);

    res.status(201).json({
      status: 'success',
      message: '下单成功',
      data: {
        item: result
      }
    });
  };
}

module.exports = placeOrder;