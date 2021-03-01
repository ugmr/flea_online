const jwt = require('../libs/token');
const { role, permission } = require('../model/models');
const { CError, ERROR } = require('../libs/error');
// 检查权限
async function checkPermission(method, path, roleId) {
  const roleInfo = await role.findOne({_id: roleId});
  const permissions = roleInfo.permissions;

  const map = new Map();
  for(const pId of permissions) {
    const p = await permission.findOne({_id: pId});
    if(!p) throw new CError(ERROR.SERVER_ERROR, "权限不存在");
    // 二级权限
    if(p.parentId) {
      let parent;
      if(map.has(p.parentId)) {
        parent = map.get(p.parentId);
      } else {
        parent = await permission.findOne({_id: p.parentId});
        if(!parent) throw new CError(ERROR.SERVER_ERROR, "权限不存在");
        map.set(p.parentId, parent);
      }
      if(method !== p.method || path !== parent.path) return false;
    } else {
    // 一级权限
      map.set(pId, p);
    }
    return true;
  }
}

module.exports = function auth (admin) {
  return async (req, res, next) => {
    const token = req.get('Authorization');
    // 验证token
    const userInfo = await jwt.verify(token);
    if(!userInfo) {
      next(new CError(ERROR.LOGIN_REQUIRED, '登陆后再来访问吧'));
    }
    // 验证管理员权限
    if(admin && !userInfo.isAdmin) next(new CError(ERROR.PERMISSION_DENIED, '需要管理员权限'));
    // 验证权限
    const hasPermission = await checkPermission(req.method, req.path, userInfo.role);
    if (!hasPermission) {
      next(new CError(ERROR.PERMISSION_DENIED, "权限不足"));
    } else {
      req.token = userInfo;
      next();
    }
  }
}