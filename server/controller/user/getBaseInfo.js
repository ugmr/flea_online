const { user } = require('../../model/models');
const { CError, ERROR } = require('../../libs/error');

// 获取用户信息
const getBaseInfo = async (req, res) => {
  // 获取参数
  const userId = req.params.id;
  // 查询结果
  const result = await user.findOne({_id: userId}, {
    userName: true,
    profilePhoto: true,
    introduction: true,
    credit: true,
  });
  if(!result) throw new CError(ERROR.DATA_NOT_FOUND, '用户不存在');
  // 返回
  res.status(200).json({
    status: 'success',
    message: '获取用户信息成功',
    data: {
      item: result
    }
  });
};


module.exports = getBaseInfo;