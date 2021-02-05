const { user } = require('../model/models');
const logger = require('../libs/log4j')('app');

module.exports = async () => {
  logger.info('Starting init user');
  const result = await user.findMany({});
  if(result.length === 0) {
    console.log(result.length)
    await user.create({
      userName: 'SuperAdmin',
      mobile: '15297372277',
      password: 'aaa123123',
      role: 'SuperAdmin',
      default: true
    });
  }
  logger.info('Init user complete');
}