import {
  login
} from './mutation-types';
import http from '@/api/http';
import '@/mock/mock';

export default {
  [login]({commit}, logInfo) {
    return http.post('/admin/login', logInfo).then(res => {
      commit(login, res.data.userInfo, res.data.token);
    });
  }
}