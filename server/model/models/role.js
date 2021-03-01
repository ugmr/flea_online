const { CError, ERROR } = require('../../libs/error');
const mongoose = require('mongoose');
const permission = require('./permission');

const nameValidator = (val) => {
  if(val.length && val.length <= 20) return true;
  throw new CError(ERROR.FORMAT_INVALID, 'Invalid role name');
}

const permissionsValidator = async (val) => {
  for(let i = 0; i < val.length; i++) {
    const result = permission.findOne({name: val[i]});
    if(!result) return false;
  }
  return true;
}

const roleSchema = new mongoose.Schema({
  // 角色名称
  name: {type: String, required: true, unique: true, validate: nameValidator},
  // 权限列表
  permissions: {type: Array, required: true, validate: permissionsValidator},
  // 是否是管理员
  isAdmin: {type: Boolean, required: true},
  // 描述
  description: {type: String},
  // 默认角色
  default: {type: Boolean, required: true}
});

const role = mongoose.model('role', roleSchema);

module.exports = role;