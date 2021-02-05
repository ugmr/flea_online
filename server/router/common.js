const router = require('../libs/router');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
// 身份验证中间件
const auth = require('../middleware/auth');

// 不需要验证的接口
const guest = [
  // 获取短信验证码
  {method: 'post', path: '/sms', handler: require('../controller/thirdParty/sms')},
  // 校验验证码
  {method: 'post', path: '/checkSMS', handler: require('../controller/thirdParty/check')},
  // 忘记密码
  {method: 'post', path: '/forget', handler: require('../controller/user/forget')},
  // 检查用户名
  {method: 'post', path: '/checkUserName', handler: require('../controller/user/checkUserName')}
];
// 需要普通用户身份验证的接口
const user = [
  // 上传文件
  {method: 'post', path: '/upload', handler: require('../controller/thirdParty/upload')}
];

// 注册路由
router.register(guest);
router.register(user, auth());

module.exports = router;