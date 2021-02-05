const { checkMobile } = require('../../libs/check');
const { CError, ERROR } = require('../../libs/error');
const smsService = require('../../services/smsService');

// 获取验证码接口 (注册/重制密码/用户注销)
const sms = async (req, res) => {
  // 获取参数
  const { mobile } = req.body;
  // 验证参数是否合法
  if(!checkMobile(mobile)) throw new CError(ERROR.FORMAT_INVALID, 'Invalid mobile');
  // 发送短信
  await smsService.sendSMS(mobile);
  // 返回
  res.status(200).json({
    status: 'success',
    message: '发送成功'
  });
};

module.exports = sms;