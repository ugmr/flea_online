const { CError, ERROR } = require('../libs/error');

const add = (model, my) => {
  return async (req, res) => {
    const info = req.body;
    if(req.params.id) {
      info.userId = req.params.id;
    }
    if(my) {
      info.userId = req.token.id;
    }
    const result = await model.create(info);
    res.status(201).json({
      status: 'success',
      message: '创建成功',
      data: {
        item: result
      }
    });
  }
}
const remove = (model, my) => {
  return async (req, res) => {
    const id = req.params.id;
    if(my) {
       const userId = req.token.id;
       const result = await model.findOne({_id: id});
       if(result && result.userId && result.userId != userId)
        throw new CError(ERROR.PERMISSION_DENIED, '权限不足');
    }
    await model.remove({_id: id});
    res.status(204).end();
  }
}
const update = (model, my) => {
  return async (req, res) => {
    const id  = req.params.id;
    const newInfo = req.body;
    if(my) {
      const userId = req.token.id;
      const result = await model.findOne({userId: id});
      if(result && result.userId && result.userId != userId)
        throw new CError(ERROR.PERMISSION_DENIED, '权限不足');
    }
    await model.update({_id: id}, newInfo);
    res.status(203).json({
      status: 'success',
      message: '修改成功'
    });
  }
}
const replace = (model) => {
  return async (req, res) => {
    const id  = req.params.id;
    const newInfo = req.body;
    await model.replaceById(id, newInfo);
    res.status(203).json({
      status: 'success',
      message: '修改成功'
    });
  }
}
const get = (model, my) => {
  return async (req, res) => {
    let userId;
    if(my) userId = req.token.id;
    else userId= req.params.id;
    const result = await model.findOne({_id: userId});
    console.log(result)
    res.status(200).json({
      status: 'success',
      message: '获取成功',
      data: {
        item: result
      }
    });
  };
}
const getList = (model, my) => {
  return async (req, res) => {
    let { conditions, fields, options } = req.query;
    conditions = JSON.parse(conditions || '{}');
    fields = JSON.parse(fields || '{}');
    options = JSON.parse(options || '{}');
    if(req.params.id) {
      conditions.userId = req.params.id;
    }
    if(my) {
      conditions.userId = req.token.id;
    }
    const result = await model.findMany(conditions, fields, options);
    res.status(200).json({
      status: 'success',
      message: '获取列表成功',
      data: {
        count: result.length,
        list: result
      }
    });
  }
}

module.exports = {
  getList,
  get,
  add,
  update,
  replace,
  remove
}