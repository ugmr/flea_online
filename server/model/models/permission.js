const { CError, ERROR } = require('../../libs/error');
const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const nameValidator = (val) => {
  if(val.length && val.length <= 21) return true;
  throw new CError(ERROR.FORMAT_INVALID, 'Invalid permission name');
}

const permissionSchema = new Schema({
  // 权限名称
  name: { type: String, required: true, unique: true, validate: nameValidator},
  // 父级权限
  parentId: {type: Schema.Types.ObjectId },
  // 权限描述
  description: { type:String, required: true },
  // 权限路径
  path: { type: String },
  // 权限方法
  method: { type: String },
});

const permission = mongoose.model('permission', permissionSchema);

module.exports = permission;