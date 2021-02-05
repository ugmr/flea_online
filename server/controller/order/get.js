const { order } = require('../../model/models');

// 获取用户订单
const getOrderByUser = (my) => {
  return async (req, res) => {
    let { conditions, fields, options } = req.query;
    conditions = JSON.parse(conditions || '{}');
    fields = JSON.parse(fields || '{}');
    options = JSON.parse(options || '{}');

    let userId;
    if(my) userId = req.token.id;
    else userId = req.params.id;
    const result = await order.findMany({
      $and: [
        conditions,
        {$or: [
          {seller: userId},
          {buyer: userId}
        ]}
      ]

    }, fields, options);

    res.status(200).json({
      status: 'success',
      message: '获取订单信息成功',
      data: {
        count: result.length,
        list: result
      }
    });
  };
};

module.exports = getOrderByUser;
