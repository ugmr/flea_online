const {CError, ERROR} = require('../libs/error');
const { user, relation } = require('../model/models');

const setup = (relation, my) => {
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
    console.log(r1, r2)
    if(!r1 || !r2) throw new CError(ERROR.DATA_NOT_FOUND, '用户不存在');

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

const cancel = (relation, my) => {
  return async (req, res) => {
    // 获取参数
    let fromId;
    if(my) fromId = req.token.id;
    else if(req.params.id) fromId = req.params.id;

    const toId = req.params.tid;
    // 验证参数是否正确
    if(!fromId || !toId || fromId === toId) throw new CError(ERROR.DATA_INVALID, '参数错误');
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
const get = (model) => {
  return async (req, res) => {
    // 获取参数
    const userId = req.params.id;
    // 验证用户是否存在
    const r1 = await user.findOne({_id: userId});
    if(!r1) throw new CError(ERROR.DATA_NOT_FOUND, '用户不存在');
    // 查询数据库
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

// 获取粉丝列表
const getFollow = async (req, res) => {
  // 获取参数
  const userId = req.params.id;
  //
  const r1 = await user.findOne({_id: userId});
  if(!r1) throw new CError(ERROR.DATA_NOT_FOUND, '用户不存在');

  const result1 = await relation.findMany({toId: userId});
  const result2 = await relation.findMany({fromId: userId, status: true});

  const result = result1.concat(result2).map(item => {
    return item.fromId
  });

  // 返回
  res.status(200).json({
    status: 'success',
    message: '获取粉丝列表成功',
    data: {
      count: result.length,
      list: result
    }
  });
}

// 移除粉丝
const cancelFollow = (my) => {
  return async (req, res) => {
    // 获取参数
    let fromId;
    if(my) fromId = req.token.id;
    else fromId = fromId = req.params.id;
    const toId = req.params.tid;
    // 验证参数是否正确
    if(fromId === toId) throw new CError(ERROR.DATA_INVALID, '参数错误');
    // 查询关注状态
    const exist1 = await relation.findOne({fromId: toId, toId: fromId});
    const exist2 = await relation.findOne({fromId: fromId, toId: toId, status: true});
    // 关注
    if(exist1) {
      await relation.remove(exist1._id);
      if(exist1.status) {
        await relation.create({fromId: fromId, toId: toId});
      }
    }
    if(exist2) {
      await relation.update({fromId: fromId, toId: toId}, {status: false});
    }
    // 返回
    res.status(204).end()
  }
}

module.exports = {
  setup,
  cancel,
  get,
  getFollow,
  cancelFollow
}