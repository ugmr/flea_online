const { permission } = require("../model/models");

const getList = async (req, res) => {
  let { conditions, fields, options } = req.query;
  conditions = JSON.parse(conditions || '{}');
  fields = JSON.parse(fields || '{}');
  options = JSON.parse(options || '{}');

  Object.keys(conditions).forEach(key => {
    const value = conditions[key];
    conditions[key] = {$regex: value, $options: "$i"};
  });
  // 查询一级权限
  conditions.parentId = null;
  // 查询
  const permissions = await permission.findMany(conditions, fields, options);

  let result = await Promise.all(permissions.map(async (p) => {
    const children = await permission.findMany({ parentId: p._id });
    let obj = {};
    obj.children = children;

    Object.assign(obj, p["_doc"]);

    return obj;
  }));

  res.status(200).json({
    status: "success",
    message: "获取权限列表成功",
    data: {
      count: result.length,
      list: result
    }
  });
}

module.exports = {
  getList
}