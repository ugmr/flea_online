const { CError, ERROR } = require('../libs/error');
const { report } = require('../model/models');

const add = (relation, my) => {
  return async (req, res) => {
    // 获取参数
    let fromId;
    if(my) fromId = req.token.id;
    else fromId = req.params.id
    const toId = req.body.to;

    // 验证参数是否正确
    if(fromId === toId) throw new CError(ERROR.DATA_INVALID, '参数错误');
    const r1 = await user.findOne({_id: toId});
    const r2 = await user.findOne({_id: fromId});
    if(!r1 || !r2) throw new CError(ERROR.DATA_NOT_FOUND, 'ID不存在');

    // 查询是否已经被关注
    const exist1 = await relation.findOne({fromId: toId, toId: fromId, status: true});
    const exist2 = await relation.findOne({fromId: fromId, toId: toId});
    if(exist1 || exist2) throw new CError(ERROR.DATA_EXISTED, '关系已存在')

    const exist = await relation.findOne({fromId: toId, toId: fromId, status: false});

    // 关注
    let result;
    if(exist) {
      result = await relation.update({fromId: toId, toId: fromId}, {status: true});
    }
    result = await relation.create({fromId: fromId, toId: toId, status: false});

    // 返回
    res.status(201).json({
      status: 'success',
      message: '添加成功',
      data: {
        result: result
      }
    });
  };
}

const remove = (relation, my) => {
  return async (req, res) => {
    // 获取参数
    let fromId;
    if(my) fromId = req.token.id;
    else fromId = req.params.id;

    const toId = req.params.tid;

    // 验证参数是否正确
    if(fromId === toId) throw new CError(ERROR.DATA_INVALID, '参数错误');
    const r1 = await user.findOne({_id: toId});
    const r2 = await user.findOne({_id: fromId});
    if(!r1 || !r2) throw new CError(ERROR.DATA_NOT_FOUND, '用户不存在');

    // 查询是否已经被关注
    const exist1 = await relation.findOne({fromId: toId, toId: fromId, status: true});
    const exist2 = await relation.findOne({fromId: fromId, toId: toId});
    if(!exist1 && !exist2) throw new CError(ERROR.DATA_NOT_FOUND, '关系不存在');

    if(exist1) {
      await relation.update({fromId: toId, toId: fromId, status: false});
    }
    else if(exist2){
      await relation.remove(exist2._id);
    }

    // 返回
    res.status(204).end();
  }
}

// 获取黑名单/获取关注列表
const get = (model, my) => {
  return async (req, res) => {
    // 获取参数
    let userId;
    if(my) userId = req.token.id;
    else userId = req.params.id;
    //
    const r1 = await user.findOne({_id: userId});
    if(!r1) throw new CError(ERROR.DATA_NOT_FOUND, '用户不存在');

    const result1 = await model.findMany({fromId: userId});
    const result2 = await model.findMany({toId: userId, status: true});

    const result = result1.concat(result2).map(item => {
      return item.toId
    });
    // 返回
    res.status(200).json({
      status: 'success',
      message: '获取列表成功',
      data: {
        count: result.length,
        list: result
      }
    });
  };
}

module.exports = {
  add,
  remove,
  get,
}