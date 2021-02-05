const {user} = require('../../model/models');
const smsService = require('../../services/smsService');
const {CError, ERROR} = require('../../libs/error');
const { checkMobile, checkPassword, checkClientId, checkCode} = require('../../libs/check');

// 忘记密码
const forget = async function (req, res) {
  const {
    mobile,
    password,
  } = req.body;
  // 验证参数是否合法
  if(!checkMobile(mobile)) throw new CError(ERROR.FORMAT_INVALID, 'Invalid Mobile');
  if(!checkPassword(password)) throw new CError(ERROR.FORMAT_INVALID, 'Invalid Password');
  // 对比验证码
  const valid = await smsService.verify(mobile, 'pass');
  if(!valid) throw new CError(ERROR.PERMISSION_DENIED, '验证码已过期');
  // 更新密码
  user.update({mobile: mobile, password: password})
  // 返回
  res.status(200).json({
    status: 'success',
    message: '密码修改成功'
  });
}

module.exports = forget;