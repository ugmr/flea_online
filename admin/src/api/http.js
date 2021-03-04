import axios from 'axios'
import { getToken } from '../libs/utils/token.js';
import store from '../store';
// import router from '../router';

const adminURL = "http://localhost:3000/api/admin/v1";
const commonURL = "http://localhost:3000/api/v1";

axios.defaults.timeout = 5000;

// 请求头加上token
const requestInterceptor = (config) => {
  store.commit("overlay/SHOW_OVERLAY");
  if(store.state.log.isLogin) {
    const token = getToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
// 响应拦截
const responseInterceptor = {
  OnFulfilled: (response) => {
    store.commit("overlay/HIDE_OVERLAY");
    return response
  },
  onReject: (error) => {
    store.commit("overlay/HIDE_OVERLAY");
    if(error.response) {
      switch (error.response.status) {
        // 返回401 清除Token并跳转到登陆页面
        case 401:
          // store.commit("LOGOUT");
          // router.replace({
          //   name: 'Login',
          //   query: { redirect: router.currentRoute.name }
          // });
          break;
      }
    }
  }
}

const adminInstance = axios.create({ baseURL: adminURL });
adminInstance.interceptors.request.use(requestInterceptor);
adminInstance.interceptors.response.use(responseInterceptor.OnFulfilled, responseInterceptor.onReject);

const commonInstance = axios.create({ baseURL: commonURL });
commonInstance.interceptors.request.use(requestInterceptor);
commonInstance.interceptors.response.use(responseInterceptor.OnFulfilled, responseInterceptor.onReject);

const http = function (instance, method) {
  return function (url, params, config) {
    return new Promise((resolve, reject) => {
      instance[method](url, params, config).then((res) => {
        if(!res) reject();
        if(method === "delete") {
          console.log(res);
          resolve();
        } else {
          if(typeof res.data === "undefined") reject();
          else if(res.data.status === "fail") reject();
          else resolve(res.data);
        }
      }, (err) => {
        reject(err);
      });
    });
  };
};

export const common = {
  post: http(commonInstance, "post")
}

export const admin = {
  get: http(adminInstance, "get"),
  post: http(adminInstance, "post"),
  put: http(adminInstance, "put"),
  patch: http(adminInstance, "patch"),
  delete: http(adminInstance, "delete")
}