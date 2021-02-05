const {CError, ERROR} = require('../libs/error');

// 添加评论
const add = (model, comment, admin) => {
  return async (req, res) => {
    const id = req.params.id;
    const info = req.body;
    if(!admin) info.userId = req.token.id;

    info.id = id;

    const exist = await model.findOne({_id: id});
    if(!exist) throw new CError(ERROR.DATA_NOT_FOUND, '数据不存在');

    const result = await comment.create(info);

    res.status(201).json({
      status: 'success',
      message: '添加评论成功',
      data: {
        item:  result
      }
    });
  };
}

// 删除评论
const remove = (model, comment) => {
  return async (req, res) => {
    const id = req.params.id;
    const cid = req.params.cid;

    const exist = await model.findOne({_id: id});
    if(!exist) throw new CError(ERROR.DATA_NOT_FOUND, '数据不存在');
    // 删除评论
    await comment.remove({_id: cid, id: id});
    res.status(204).end();
  }
}

// 获取评论列表
const get = (model, comment) => {
  return async (req, res) => {
    const id = req.params.id;

    const exist = await model.findOne({_id: id});
    if(!exist) throw new CError(ERROR.DATA_NOT_FOUND, '数据不存在');
    // 查询数据库
    const result = await comment.findMany({id: id});
    res.status(200).json({
      status: 'success',
      message: '获取成功',
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
  get
}