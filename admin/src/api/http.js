import axios from 'axios'
import { getToken } from '../utils/token.js';
import store from '../store';
import {
  logout
} from '../store/mutation-types';
import router from '../router';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.timeout = 5000;

// 请求头加上token
axios.interceptors.request.use(config => {
  if(store.state.isLogin) {
    config.headers.Authorization = `token ${getToken()}`;
  }
  return config;
})
// 响应拦截
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if(error.response) {
    switch (error.response.status) {
      // 返回401 清除Token并跳转到登陆页面
      case 401:
        store.commit(logout);
        router.replace({
          name: 'Login',
          query: {redirect: router.currentRoute.name}
        });
        break;
    }
  }
})
const METHODS = ['get', 'post', 'delete', 'put'];

let http = {};

METHODS.forEach(method => {
  http[method] = function (url, params) {
      return new Promise((resolve, reject) => {
        axios[method](url, params).then((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    };
})

export default http;