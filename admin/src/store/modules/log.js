import { removeToken, setToken } from "@/libs/utils/token";
import { login, logout } from "@/api/api";

export default {
  namespaced: true,
  state: {
    isLogin: false,  // 用户是否登陆
    userInfo: {}     // 登陆用户信息
  },
  mutations: {
    ['LOGIN'](state, payload) {
      state.isLogin = true;
      state.userInfo = payload.userInfo;
      setToken(payload.token);
    },
    ['LOGOUT'](state) {
      state.isLogin = false;
      state.userInfo = {};
      removeToken();
    },
  },
  actions: {
    ['LOGIN']({commit}, logInfo) {
      return login(logInfo).then((result)=> {
        commit("LOGIN", {
          userInfo: result.data.userInfo,
          token: result.data.token
        });
      });
    },
    ["LOGOUT"]({commit}) {
      return logout().then(() => {
        commit("LOGOUT");
      })
    }
  }
}