const express = require('express');
const router = express.Router();

// 注册路由
router.register = function (routeList, middleware) {
  let params;
  routeList.forEach(route => {
    if(!route.method || !route.path || !route.handler) return;
    params = middleware
        ? [route.path, middleware, route.handler]
        : [route.path, route.handler];
    this[route.method](...params);
  });
};

module.exports = router;