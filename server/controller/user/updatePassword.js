const { user } = require('../../model/models');
const { checkPassword } = require('../../libs/check');
const { CError, ERROR } = require('../../libs/error');
// 获取用户信息
const updatePassword = async (req, res) => {
  // 获取参数
  const userId = req.token.id;
  const { password } = req.body;
  if(!checkPassword(password))
    throw new CError(ERROR.FORMAT_INVALID, '密码格式错误')
  // 查询结果
  await user.update({_id: userId}, {
    password: password
  });
  // 返回
  res.status(203).json({
    status: 'success',
    message: '修改密码成功',
  });
};

module.exports = updatePassword;