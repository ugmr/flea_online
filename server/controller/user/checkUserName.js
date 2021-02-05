const { user } = require('../../model/models');
const { checkUserName } = require('../../libs/check');
const { CError, ERROR } = require('../../libs/error');

// 验证用户名是否存在
const check = async function (req, res) {
  const { userName } = req.body;
  // 验证参数格式
  if(!checkUserName(userName)) throw new CError(ERROR.FORMAT_INVALID, '用户名格式错误');
  // 校验用户名
  const exist = user.findOne({userName: userName});
  // 正常返回
  res.status(200).json({
    status: 'success',
    message: '获取校验结果成功',
    data: {
      exist: !!exist
    }
  });
}

module.exports = check;