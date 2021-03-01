const permissions = require('../config/permissions.json');
const { permission, role, user, setting } = require('../model/models');
const logger = require('../libs/log4j')('app');

let defaultRole = {
  name: '超级管理员',
  isAdmin: true,
  default: true
};

const defaultUser = {
  userName: "超级管理员",
  mobile: "15297372277",
  password: "aaa123",
}

const defaultSetting = {
  name: '',
  domain: '',
  title: '',
  keywords: '',
  description: '',
  copyright: '',
  default: true
}

const initPermission = async () => {
  const exist = await permission.findMany();
  if (!exist.length) {
    for (const p of permissions) {
      const result = await permission.create({
        name: p.name,
        description: p.description,
        path: p.path,
      });

      for(const child of p.children) {
        permission.create({
          name: child.name,
          description: p.description,
          method: child.method,
          parentId: result._id
        });
      }
    }
  }
}

const initRole = async () => {
  const exist = await role.findOne({name: defaultRole.name});
  if(!exist) {
    const permissions = await permission.findMany({});
    defaultRole.permissions = permissions.map(p => p._id),
    await role.create(defaultRole);
  }
}

const initUser = async () => {
  const exist = await user.findOne({userName: defaultUser.userName});
  if(!exist) {
    const roleInfo = await role.findOne({name: defaultRole.name});
    defaultUser.role = roleInfo._id;
    await user.create(defaultUser);
  }
}

const initSetting =  async () => {
  const exist = await setting.findOne({default: true});
  if(!exist) {
    await setting.create(defaultSetting);
  }
}

module.exports = async () => {
  logger.info("初始化开始...");
  await initPermission();
  await initRole();
  await initUser();
  await initSetting();
  logger.info("初始化完成！");
}