const {CError, ERROR} = require('../../libs/error');
const logger = require('../../libs/log4j')('mongdb');
const oldModels = {
  user: require('./user'),
  blacklist: require('./blacklist'),
  relation: require('./relation'),
  collect: require('./collect'),
  category: require('./category'),
  goods: require('./goods'),
  permission: require('./permission'),
  role: require('./role'),
  topic:require('./topic'),
  advert: require('./advert'),
  announcement: require('./announcement'),
  goodsComment: require('./goodsComment'),
  message: require('./message'),
  notice: require('./notice'),
  order: require('./order'),
  orderEvaluation: require('./orderEvaluation'),
  post: require('./post'),
  postComment: require('./postComment'),
  report: require('./report'),
  setting: require('./setting'),
  userTopic: require('./userTopic'),
  delivery: require('./delivery'),
};



const getModel = function (oldModel) {
  const model = {}

  model.modelName = oldModel.collection.collectionName;

  // 新建 ？ 格式错误时
  model.create = function (info) {
    return new Promise(((resolve, reject) => {
      const n = new oldModel(info);
      n.save().then(resolve).catch(e => {
        logger.error(oldModel.modelName +' create error: ' + e);
        logger.debug(info)
        reject(new CError(ERROR.SERVER_ERROR, 'Database write error'));
      });
    }));
  }
  // 删除
  model.remove = function (conditions) {
    return new Promise(((resolve, reject) => {
      oldModel.deleteOne(conditions).then(r => {
        if(!r) reject(new CError(ERROR.DATA_NOT_FOUND, 'Not found, delete failed'));
        resolve(r);
      }).catch(e => {
        logger.error(e);
        reject(new CError(ERROR.SERVER_ERROR, 'Delete failed'))
      });
    }));
  }
  // 修改
  model.update = function (conditions, newInfo) {
    return new Promise(((resolve, reject) => {
      oldModel.findOneAndUpdate(conditions, {$set: newInfo})
          .then(resolve)
          .catch(e => {
            logger.error(e);
            reject(new CError(ERROR.SERVER_ERROR, 'Update failed'));
          });
    }));
  }

  model.replaceById = function (id, newInfo) {
    return new Promise(((resolve, reject) => {
      model.remove({_id: id}).then(r => {
        newInfo._id = id;
        return model.create(newInfo);
      }).then(resolve).catch(e => {
        logger.error(e);
        reject(new CError(ERROR.SERVER_ERROR, '修改失败'));
      });
    }));
  }

  model.findOne = function (conditions, projection, options) {
    return new Promise(((resolve, reject) => {
      oldModel.findOne(conditions, projection, options)
          .then(resolve)
          .catch(e => {
            logger.error(e);
            reject(new CError(ERROR.SERVER_ERROR, 'Get failed'));
          });
    }));
  };

  model.findMany = function (conditions, projection, options) {
    return new Promise(((resolve, reject) => {
      oldModel.find(conditions, projection, options)
          .then(resolve)
          .catch(e => {
            logger.error('Mongo find error: ' + e);
            reject(new CError(ERROR.SERVER_ERROR, 'Get failed'));
          });
    }));
  }
  return model;
}

let newModel = {};
Object.keys(oldModels).forEach((model) => {
  newModel[model] = getModel(oldModels[model]);
})

module.exports = newModel;