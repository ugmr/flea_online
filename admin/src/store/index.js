import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,  // 用户是否登陆
    userInfo: {}     // 登陆用户信息
  },
  mutations,
  actions,
});
