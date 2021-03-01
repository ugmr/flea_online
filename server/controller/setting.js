const { setting } = require( "../model/models");
// const { CError, ERROR } = require('../libs/error');

const get = async (req, res) => {
  const result = await setting.findOne({default: true});

  res.status(200).json({
    status: "success",
    message: "获取设置成功",
    data: {
      setting: result
    }
  });
}

const edit = async (req, res) => {
  const info = req.body;

  await setting.update({default: true}, info);

  res.status(203).json({
    status: "success",
    message: "修改设置成功",
  });
}

module.exports = {
  get,
  edit
}