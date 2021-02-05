const redisDb = require('../../model/redis');
// 登出接口
const logout = (admin) => {
  return async (req, res) => {
    const userId = req.token.id;
    // 登出
    await redisDb.del(redisDb.types.TOKEN, userId);
    // 返回结果
    res.status(200).json({
      status: 'success',
      message: '登出成功'
    });
  }
}

module.exports = logout;