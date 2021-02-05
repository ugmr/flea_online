const { role, permission } = require('../model/models');
const logger = require('../libs/log4j')('app');

module.exports = async () => {
  const result = await role.findOne({default: true});
  logger.info('Starting init role');
  if(!result) {
    const permissions = await permission.findMany({});
    await role.create({
      name: 'SuperAdmin',
      permissions: permissions.map(p => p.name),
      isAdmin: true,
      default: true
    })
  }
  logger.info('Init role complete');
}