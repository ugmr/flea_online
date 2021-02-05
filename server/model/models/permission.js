const { CError, ERROR } = require('../../libs/error');
const mongoose = require('mongoose');

const nameValidator = (val) => {
  if(val.length && val.length <= 21) return true;
  throw new CError(ERROR.FORMAT_INVALID, 'Invalid permission name');
}

const resourceValidator = (val) => {
  return mongoose.modelNames().includes(val);
}

const actionValidator = (val) => ['read', 'write'].includes(val);

const permissionSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, validate: nameValidator},
  resource: {type: String, required: true, validate: resourceValidator},
  action: {type: String, required: true, validate: actionValidator}
});

const permission = mongoose.model('permission', permissionSchema);

module.exports = permission;