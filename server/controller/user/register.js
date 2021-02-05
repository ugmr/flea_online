const smsService = require('../../services/smsService');
const { user, role } = require('../../model/models');
const { checkMobile, checkPassword } = require('../../libs/check');
const { CError, ERROR } = require('../../libs/error');
const logger = require('../../libs/log4j')('register');
// 注册用户接口
const register = async (req, res) => {
  // 获取参数
  const { mobile, password, userName } = req.body;
  // 检查格式
  if(!checkMobile(mobile)) throw new CError(ERROR.FORMAT_INVALID, '手机号格式错误');
  if(!checkPassword(password)) throw new CError(ERROR.FORMAT_INVALID, '密码格式错误');
  // 是否经过验证
  const valid = smsService.verify(mobile, 'pass');
  if(!valid) throw new CError(ERROR.PERMISSION_DENIED, '验证码已过期');
  // 验证手机号是否被创建
  const result = await user.findOne({mobile: mobile});
  if(result) throw new CError(ERROR.USER_EXISTED, '手机号已被注册');
  // 角色
  const defaultRole = await role.findOne({default: true});
  // 返回新建的 用户
  const u = await user.create({
    mobile: mobile,
    password: password,
    userName: userName,
    role: defaultRole.name
  });
  // 返回
  res.status(200).json({
    status: 'success',
    message: '发送成功',
    data: {
      user: u
    }
  });
};

module.exports = register;