const jwt = require('../libs/token');
const { CError, ERROR } = require('../libs/error');

module.exports = function auth (admin) {
  return async (req, res, next) => {
    const token = req.get('Authorization');
    const result = await jwt.verify(token);
    if(result) {
      if(admin && !result.isAdmin) next(new CError(ERROR.PERMISSION_DENIED, '需要管理员权限'));
      else {
        req.token = result;
        next();
      };
    } else {
      next(new CError(ERROR.LOGIN_REQUIRED, '登陆后再来访问吧'));
    }
  }
}