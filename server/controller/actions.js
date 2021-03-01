const { CError, ERROR } = require('../libs/error');
const redis = require("../model/redis");

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
// 获取信息
const get = (model, my) => {
  return async (req, res) => {
    let userId;
    if(my) userId = req.token.id;
    else userId= req.params.id;
    const result = await model.findOne({_id: userId});

    res.status(200).json({
      status: 'success',
      message: '获取成功',
      data: {
        item: result
      }
    });
  };
}
// 获取列表
const getList = (model, my) => {
  return async (req, res) => {

    // 获取参数
    let { conditions, fields, options } = req.query;
    conditions = JSON.parse(conditions || '{}');
    fields = JSON.parse(fields || '{}');
    options = JSON.parse(options || '{}');

    Object.keys(conditions).forEach(key => {
      const value = conditions[key];
      conditions[key] = key === "parentId"
          ? value
          : {$regex: value, $options: "$i"};
    });

    if(req.params.id) {
      conditions.userId = req.params.id;
    }
    if(my) {
      conditions.userId = req.token.id;
    }

    const result = await model.findMany(conditions, fields, options);

    const modelName = model.modelName;
    if(modelName.toUpperCase() == "POST") {
      for (const item of result) {
        const data = await redis.get(redis.types[model.modelName], item._id);
        if (data) {
          item.view = data.view;
          item.like = data.like;
        }
      }
    }

    // 返回数据
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

// 浏览量
// 点赞数
// 收藏数

// 帖子 回复数