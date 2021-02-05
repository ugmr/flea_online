const { user, role } = require('../../model/models');
const redisDb = require('../../model/redis');
const jwt = require('../../libs/token');
const { checkMobile, checkPassword } = require('../../libs/check');
const { CError, ERROR } = require('../../libs/error');
const logger = require('../../libs/log4j')('login');
// 用户登陆接口
const login = function (admin) {
  return async (req, res) => {
    // 获取参数
    const {
      mobile,
      password,
    } = req.body;
    // 验证参数是否正确
    if(!checkMobile(mobile)) throw new CError(ERROR.FORMAT_INVALID, 'Invalid Mobile');
    if(!checkPassword(password)) throw new CError(ERROR.FORMAT_INVALID, 'Invalid Password');
    // 查询用户
    const result = await user.findOne({mobile: mobile, password: password});
    if(!result) throw new CError(ERROR.LOGIN_REQUIRED, '用户名或密码错误');
    // 管理员登陆
    const r = await role.findOne({name: result.role}) || await role.findOne({default: true});
    if(admin && (!r || !r.isAdmin)) throw new CError(ERROR.LOGIN_REQUIRED, '不是管理员账户');
    logger.info(result, r);
    // 生成token
    const token = await jwt.sign({
      id: result._id,
      mobile: result.mobile,
      userName: result.userName,
      role: r._id,
      isAdmin: r.isAdmin
    });
    // 写入redis
    await redisDb.set(redisDb.types.TOKEN, result.mobile, token, 24 * 60 * 60 * 60);
    // 返回
    res.status(200).json({
      status: 'success',
      message: '登陆成功',
      data: {
        token: token
      }
    });
  };
}

module.exports = login;