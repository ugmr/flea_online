const mongoose = require('mongoose');
const redisDb = require('../model/redis');
const { permission } = require('../model/models');
const logger = require('../libs/log4j')('app');

module.exports = async () => {

  logger.info('Starting init Permission');
  mongoose.modelNames().forEach(async (modelName) => {
    const result = await permission.findOne({resource: modelName, action: 'read'});
    if(!result) {
      await permission.create({
        name: 'read ' + modelName,
        resource: modelName,
        action: 'read'
      });
    }
    const result2 = await permission.findOne({resource: modelName, action: 'write'});
    if(!result2) {
      await permission.create({
        name: 'write ' + modelName,
        resource: modelName,
        action: 'write'
      });
    }
  });
  logger.info('Init Permission complete');
}