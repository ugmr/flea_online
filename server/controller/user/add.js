const smsService = require('../../services/smsService');
const { user, role } = require('../../model/models');
const { checkMobile } = require('../../libs/check');
const { CError, ERROR } = require('../../libs/error');

// 添加用户接口
const add = async (req, res) => {
  // 获取参数
  const userInfo = req.body;
  // 检查格式
  if(!checkMobile(userInfo.mobile)) throw new CError(ERROR.FORMAT_INVALID, '手机号格式错误');
  // 是否经过验证
  const valid = await smsService.verify(userInfo.mobile, 'pass');
  if(!valid) throw new CError(ERROR.PERMISSION_DENIED, '验证码已过期');
  // 验证手机号是否被创建
  const exist = await user.findOne({mobile: userInfo.mobile});
  if(exist) throw new CError(ERROR.USER_EXISTED, '手机号已被注册');
  // 设置角色
  if(!userInfo.role) {
    const defaultRole = await role.findOne({default: true});
    userInfo.role = defaultRole.name;
  }
  // 返回新建的用户
  const result = await user.create(userInfo);
  // 返回
  res.status(200).json({
    status: 'success',
    message: '添加成功',
    data: {
      item: result
    }
  });
};

module.exports = add;