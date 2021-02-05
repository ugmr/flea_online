const { user } = require('../../model/models');

// 获取用户信息
const updateProfile = async (req, res) => {
  // 获取参数
  const userId = req.token.id;
  let newInfo = req.body;
  // 查询结果
  await user.update({_id: userId}, newInfo);
  // 返回
  res.status(203).json({
    status: 'success',
    message: '修改个人信息成功',
  });
};

module.exports = updateProfile;