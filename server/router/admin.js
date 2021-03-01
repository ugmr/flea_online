const express = require('express');
const router = express.Router();
const models = require('../model/models');
const actions = require('../controller/actions');
const relation = require('../controller/relation');
const comment = require('../controller/comment');
const focus = require('../controller/focus');
const setting = require('../controller/setting');
const permission = require('../controller/permission');
const evaluation = require('../controller/evaluation');
const role = require('../controller/role.js');
// 身份验证中间件
const auth = require('../middleware/auth');

// 登陆登出
router.post('/login', require('../controller/log/login')(true));
router.post('/logout', auth(true),require('../controller/log/logout')(true));

Object.keys(models).forEach(modelName => {
  if(['post', 'role', 'permission','blacklist', 'relation', 'collect', 'userTopic', 'postComment', 'goodsComment', 'evaluation', 'setting'].includes(modelName)) return;
  const model = models[modelName];

  const modelUrl = `/${modelName}`;
  const itemUrl = `/${modelName}/:id`;

  if(modelName == 'user') {
    router.post(modelUrl, auth(true), require('../controller/user/add'));
  }
  else {
    router.post(modelUrl,auth(true), actions.add(model));
  }
  if(modelName == 'user') console.log(itemUrl)
  router.get(modelUrl, auth(true), actions.getList(model));
  router.get(itemUrl, auth(true), actions.get(model));
  router.delete(itemUrl, auth(true), actions.remove(model));
  router.put(itemUrl, auth(true), actions.replace(model));
  router.patch(itemUrl, auth(true), actions.update(model));
});
// 黑名单
router.get('/user/:id/blacklist', auth(true), relation.get(models.blacklist));
router.post('/user/:id/blacklist', auth(true), relation.setup(models.blacklist));
router.delete('/user/:id/blacklist/:tid', auth(true), relation.cancel(models.blacklist));
// 关注与粉丝
router.get('/user/:id/focus', auth(true), relation.get(models.relation));
router.get('/user/:id/follow', auth(true), relation.getFollow);
router.post('/user/:id/focus', auth(true), relation.setup(models.relation));
router.delete('/user/:id/focus/:tid', auth(true), relation.cancel(models.relation));
router.delete('/user/:id/follow/:tid', auth(true), relation.cancelFollow())
// 用户收藏
router.get('/user/:id/collect', auth(true), focus.get(models.collect));
router.post('/user/:id/collect', auth(true), focus.focus(models.collect));
router.delete('/user/:id/collect/:tid', auth(true), focus.cancel(models.collect));
// 用户关注话题
router.get('/user/:id/topic', auth(true), focus.get(models.userTopic));
router.post('/user/:id/topic', auth(true), focus.focus(models.userTopic));
router.delete('/user/:id/topic/:tid', auth(true), focus.cancel(models.userTopic));
// 评论
router.get('/post/:id/comment', auth(true), comment.get(models.post, models.postComment, true));
router.post('/post/:id/comment', auth(true), comment.add(models.post, models.postComment, true));
router.delete('/post/:id/comment/:cid', auth(true), comment.remove(models.post, models.postComment, true));

router.get('/goods/:id/comment', auth(true), comment.get(models.goods, models.goodsComment, true));
router.post('/goods/:id/comment', auth(true), comment.add(models.goods, models.goodsComment, true));
router.delete('/goods/:id/comment/:cid', auth(true), comment.remove(models.goods, models.goodsComment, true));

// 评价
router.get('/order/:id/evaluation', auth(true), evaluation.get);
router.post('/order/:id/evaluation', auth(true), evaluation.add);
router.delete('/order/:id/evaluation', auth(true), evaluation.remove);
// 设置
router.get("/setting", auth(true), setting.get);
router.put("/setting", auth(true), setting.edit);
// 权限
router.get("/permission", auth(true), permission.getList);
// 角色
router.get("/role", auth(true), role.getList);
// 话题
// router.get("/topic", auth(true), topic.getTopicList);
module.exports = router;