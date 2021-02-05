const { user } = require('../../model/models');
const smsService = require('../../services/smsService');
const { CError, ERROR } = require('../../libs/error');

// 用户注销账户
const logoff = async (req, res) => {
  // 获取参数
  const userId = req.token.id;
  const mobile = req.token.mobile;
  // 对比验证码
  const valid = await smsService.verify(mobile, 'pass');
  if(!valid) throw new CError(ERROR.PERMISSION_DENIED, '验证码已过期');
  // 删除
  await user.remove({_id: userId});
  // 返回
  res.status(200).json({
    status: 'success',
    message: '注销用户成功'
  });
};

module.exports = logoff;