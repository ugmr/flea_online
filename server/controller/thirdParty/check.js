const { user } = require('../../model/models');
const redisDb = require('../../model/redis');
const { checkMobile } = require('../../libs/check');
const { CError, ERROR } = require('../../libs/error');

// 校验验证码（注册/重制密码/注销用户）
const validate = async function (req, res) {
  const { mobile, code, type } = req.body;
  // 验证参数格式
  if(!checkMobile(mobile)) throw new CError(ERROR.FORMAT_INVALID, '手机号格式错误');
  if(type != 0 && type != 1 && type != 2) throw new CError(ERROR.FORMAT_INVALID, '类型格式错误');
  // 校验验证码
  const result = await redisDb.get(redisDb.types.CAPTCHA, mobile);
  const valid = result == code;
  console.log(result, code)
  if(valid) {
    // 验证用户是否存在
    const exist = user.findOne({mobile: mobile});
    // 注册用户已存在
    if(type == 0 && exist) throw new CError(ERROR.USER_EXISTED, '用户已存在');
    // 重制/注销 用户已存在
    if((type == 1 || type == 2) && !exist) throw new CError(ERROR.USER_NOT_FOUND, '用户不存在');
    // 把结果写入redis
    await redisDb.set(redisDb.types.CAPTCHA, mobile, 'pass', 5 * 60);
  }
  // 正常返回
  res.status(200).json({
    status: 'success',
    message: '获取校验结果成功',
    data: {
      valid: valid
    }
  });
}

module.exports = validate;