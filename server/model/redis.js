const { promisify } = require("util");
const logger = require('../libs/log4j')('redis');
const { CError, ERROR } = require('../libs/error');
const redis = require("redis");
const config = require('../config/redis');

const client = redis.createClient(config.port, config.host);

client.on('error',function (err) {
  logger.error('redis error：'+ err);
  process.exit(1);
});

client.on('connect',function () {
  logger.info('redis连接成功...')
});
// 使用promise
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);
const expireAsync = promisify(client.expire).bind(client);
const selectAsync = promisify(client.select).bind(client);
/**
 *
 * @param dbNum 库号
 * @param key 键
 * @param value 值
 * @param expire 过期时间（单位：秒，可为空，为空则不过期）
 */
const set = function (dbNum, key, value, expire) {
  console.log(dbNum, key, value, expire)
  return new Promise(((resolve, reject) => {
    selectAsync(dbNum).then((r) => {
      return setAsync(key, value);
    }).then((r) => {
      return expireAsync(key, expire);
    }).then(resolve).catch(e => {
      logger.error('Redis set failed: ' + e);
      reject(new CError(ERROR.SERVER_ERROR, 'Redis set failed'));
    });
  }));
};
/**
 *
 * @param dbNum 库号
 * @param key 键
 */
const get = function (dbNum, key) {
  return new Promise(((resolve, reject) => {
    selectAsync(dbNum).then((r) => {
      return getAsync(key);
    }).then(resolve).catch(e => {
      reject(new CError(ERROR.SERVER_ERROR, 'Redis get failed'));
    });
  }));
};
/**
 *
 * @param dbNum 库号
 * @param key 键
 */
const del = function (dbNum, key) {
  return new Promise(((resolve, reject) => {
    selectAsync(dbNum).then((r) => {
      return delAsync(key);
    }).then(resolve).catch(e => {
      reject(new CError(ERROR.SERVER_ERROR, 'Redis delete failed'));
    });
  }));
}
// redis库
const types = {
  CAPTCHA: 0,
  TOKEN: 1
}

module.exports = {
  types,
  get,
  set,
  del
};