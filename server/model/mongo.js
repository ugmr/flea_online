const config = require('../config/mongo');
const mongoose = require('mongoose');
const logger = require('../libs/log4j')('mongodb');

mongoose.connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,        // 使用原生的FindAndModify
  promiseLibrary: global.Promise, // 使用原生Promise
  poolSize: 10,            //设置最大连接数
  bufferMaxEntries: false  //禁止使用缓存
});

const connection = mongoose.connection;
connection.once('open', () => {
  logger.info('mongodb连接成功...');
})
connection.on('error', (err) => {
  logger.error('mongodb连接出错: ' + err);
  process.exit(1);
});

module.exports = mongoose;