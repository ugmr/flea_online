const focus = (model, my) => {
  return async (req, res) => {
    let userId;
    if(my) userId = req.token.id;
    else userId = req.params.id;
    const targetId = req.body.to;

    const result = await model.create({
      userId: userId,
      targetId: targetId
    });

    res.status(201).json({
      status: 'success',
      message: '关注成功',
      data: {
        item: result
      }
    });
  }
}
const cancel = (model, my) => {
  return async (req, res) => {
    let userId;
    if(my) userId = req.token.id;
    else userId = req.params.id;
    const targetId = req.params.tid;

    await model.remove({userId: userId, targetId: targetId});

    res.status(204).end();
  }
}

const get = (model, my) => {
  return async (req, res) => {
    let userId;
    if(my) userId = req.token.id;
    else userId = req.params.id;

    const result = await model.findMany({
      userId: userId
    });

    res.status(200).json({
      status: 'success',
      message: '获取成功',
      data: {
        count: result.length,
        list: result
      }
    });
  }
}
module.exports = {
  focus,
  cancel,
  get
}