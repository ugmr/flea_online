const router = require('../libs/router');
const actions = require('../controller/actions');
const relation = require('../controller/relation');
const evaluation = require('../controller/evaluation');
const comment = require('../controller/comment');

const models = require('../model/models');
// 身份验证中间件
const auth = require('../middleware/auth');
// 不需要验证的接口
const guest = [
  // 用户注册
  {method: 'post', path: '/register', handler: require('../controller/user/register')},
  // 用户登陆
  {method: 'post', path: '/login', handler: require('../controller/log/login')()},
  // 获取用户信息
  {method: 'get', path: '/user/:id', handler: require('../controller/user/getBaseInfo')},

  // 获取关注用户列表
  {method: 'get', path: '/user/:id/focus', handler: relation.get(models.relation)},
  // 获取粉丝列表
  {method: 'get', path: '/user/:id/follow', handler: relation.getFollow},

  // 获取所有评价信息
  {method: 'get', path: '/user/:id/evaluation', handler: evaluation.getByUser},

  // 获取推广列表
  {method: 'get', path: '/advert', handler: actions.getList(models.advert)},
  // 获取分类列表
  {method: 'get', path: '/category', handler: actions.getList(models.category)},

  // 获取商品列表
  {method: 'get', path: '/goods', handler: actions.getList(models.goods)},
  // 获取商品详情
  {method: 'get', path: '/goods/:id', handler: actions.get(models.goods)},
  // 获取商品评论
  {method: 'get', path: '/goods/:id/comment', handler: comment.get(models.goods, models.goodsComment)},

  // 获取圈子列表
  {method: 'get', path: '/topic', handler: actions.getList(models.topic)},
  // 获取圈子详情
  {method: 'get', path: '/topic/:id', handler: actions.get(models.topic)},

  // 获取帖子列表
  {method: 'get', path: '/post', handler: actions.getList(models.post)},
  // 获取帖子详情
  {method: 'get', path: '/post/:id', handler: actions.get(models.post)},
  // 获取帖子评论信息
  {method: 'get', path: '/post/:id/comment', handler: comment.get(models.post, models.postComment)},
];
// 需要普通用户身份验证的接口
const user = [
  // 登出
  {method: 'post', path: '/logout', handler: require('../controller/log/logout')()},
  // 用户注销
  {method: 'post', path: '/logoff', handler: require('../controller/user/logoff')},

  // 用户相关

  // 获取用户个人信息
  {method: 'get', path: '/my', handler: actions.get(models.user, true)},
  // 修改用户密码
  {method: 'put', path: '/my/password', handler: require('../controller/user/updatePassword')},
  // 修改用户个人信息
  {method: 'patch', path: '/my/profile', handler: require('../controller/user/updateProfile')},

  // 获取用户收货地址
  {method: 'get', path: '/my/delivery', handler: actions.getList(models.delivery, true)},
  // 添加用户收货地址
  {method: 'post', path: '/my/delivery', handler: actions.add(models.delivery, true)},
  // 修改用户收货地址
  {method: 'put', path: '/my/delivery/:id', handler: actions.replace(models.delivery, true)},
  // 删除用户收货地址
  {method: 'delete', path: '/my/delivery/:id', handler: actions.remove(models.delivery)},


  // 用户关系相关

  // 关注用户
  {method: 'post', path: '/my/focus', handler: relation.setup(models.relation, true)},
  // 取消关注
  {method: 'delete', path: '/my/focus/:tid', handler: relation.cancel(models.relation, true)},
  // 取消粉丝关注
  {method: 'delete', path: '/my/follow/:tid', handler: relation.cancelFollow(true)},
  // 拉入黑名单
  {method: 'post', path: '/my/blacklist', handler: relation.setup(models.blacklist, true)},
  // 取消黑名单
  {method: 'delete', path: '/my/blacklist/:tid', handler: relation.cancel(models.blacklist, true)},
  // 获取黑名单列表
  {method: 'get', path: '/my/blacklist', handler: relation.get(models.blacklist, true)},

  // 用户收藏相关

  // 获取收藏列表
  {method: 'get', path: '/my/collect', handler: actions.getList(models.collect, true)},
  // 添加收藏
  {method: 'post', path: '/my/collect', handler: actions.add(models.collect, true)},
  // 取消收藏
  {method: 'delete', path: '/my/collect/:id', handler: actions.remove(models.collect, true)},

  // 商品相关

  // 发布商品
  {method: 'post', path: '/goods', handler: actions.add(models.goods, true)},
  // 修改我的商品
  {method: 'patch', path: '/goods/:id', handler: actions.update(models.goods, true)},
  // 删除我的商品
  {method: 'delete', path: '/goods/:id', handler: actions.remove(models.goods, true)},
  // 发布商品评论
  {method: 'post', path: '/goods/:id/comment', handler: comment.add(models.goods, models.goodsComment)},

  // 订单相关

  // 获取用户订单
  {method: 'get', path: '/my/order', handler: require('../controller/order/get')(true)},
  // 下单
  {method: 'post', path: '/order', handler: require('../controller/order/add')(true)},
  // 支付
  //{method: 'post', path: '/order/:id/pay', handler: require('../controller/thirdParty/pay')},
  // 取消订单
  {method: 'post', path: '/order/:id/cancel', handler: require('../controller/order/cancel')},
  // 修改物流信息
  {method: 'patch', path: '/order/:id/logistic', handler: require('../controller/order/logistic')},
  // 删除订单
  {method: 'delete', path: '/order/:id', handler: actions.remove(models.order)},

  // 获取订单评价信息
  {method: 'get', path: '/order/:id/evaluation', handler: evaluation.get},
  // 发布订单评价
  {method: 'post', path: '/order/:id/evaluation', handler: evaluation.add},
  // 修改评价
  {method: 'put', path: '/order/:id/evaluation/:tid', handler: evaluation.update},

  // 举报相关

  // 举报
  {method: 'post', path: '/report', handler: actions.add(models.report, true)},
  // 获取我的举报列表信息
  {method: 'get', path: '/report', handler: actions.getList(models.report, true)},
  // 获取举报详情
  {method: 'get', path: '/report/:id', handler: actions.get(models.report, true)},

  // 话题相关

  // 关注圈子
  {method: 'post', path: '/my/topic', handler: actions.add(models.userTopic, true)},
  // 取消关注圈子
  {method: 'delete', path: '/my/topic/:tid', handler: actions.remove(models.userTopic, true)},

  // 发布帖子
  {method: 'post', path: '/post', handler: actions.add(models.post, true)},
  // 删除帖子
  {method: 'delete', path: '/post/:id', handler: actions.remove(models.post, true)},
  // 回复帖子
  {method: 'post', path: '/post/:id/comment', handler: comment.add(models.post, models.postComment)},

  // 通知相关

  // 获取公告信息列表
  {method: 'get', path: '/announcement', handler: actions.getList(models.announcement)},
  // 获取公告详情
  {method: 'get', path: '/announcement/:id', handler: actions.get(models.announcement)},
  // 获取通知信息列表
  {method: 'get', path: '/notice', handler: actions.getList(models.notice, true)},
  // 获取通知详情
  {method: 'get', path: '/notice/:id', handler: actions.get(models.notice, true)},

  // 点赞
  {method: 'post', path: '/like'}
];

// 注册路由
router.register(guest);
router.register(user, auth());

module.exports = router;