const { role, permission } = require('../model/models');

const getList = async (req, res) => {

  //参数解析
  let { conditions, fields, options } = req.query;

  conditions = JSON.parse(conditions || '{}');
  fields = JSON.parse(fields || '{}');
  options = JSON.parse(options || '{}');

  Object.keys(conditions).forEach(key => {
    conditions[key] = {$regex: conditions[key], $options: "$i"};
  });

  // 查询
  let roles = await role.findMany(conditions, fields, options);

  for(let i in roles) {
    let level1 = [];
    let level2 = [];
    for(let j in roles[i].permissions) {
      const result = await permission.findOne({_id: roles[i].permissions[j]});
      // @todo 删除失效值
      if(!result) continue;

      if(result.parentId) level2.push(result);
      else level1.push(result);
    }
    roles[i].permissions = level1.map(p1 => {
      let obj = {};
      obj.children = [];
      level2.forEach(p2 => {
        if(p1._id.toString() == p2.parentId.toString()) {
          obj.children.push(p2);
        }
      });
      Object.assign(obj, p1["_doc"]);

      return obj;
    });

    console.log(roles)
  }
  // 返回结果
  res.status(200).json({
    status: 'success',
    message: '获取角色列表成功',
    data: {
      count: roles.length,
      list: roles
    }
  });
}

module.exports = {
  getList
}