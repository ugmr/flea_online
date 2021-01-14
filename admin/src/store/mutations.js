import {
  login,
  logout
} from './mutation-types';
import { setToken, removeToken } from "@/utils/token";

export default {
  [login](state, userInfo, token) {
    state.isLogin = true;
    state.userInfo = userInfo;
    setToken(token);
  },
  [logout](state) {
    state.isLogin = false;
    state.userInfo = {};
    removeToken();
  }
}