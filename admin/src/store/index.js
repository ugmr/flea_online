import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import overlay from "./modules/overlay";
import log from "./modules/log";
import theme from "./modules/theme";
import {getSetting} from "@/api/api";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "",
    copyright: "",
  },
  mutations: {
    ["CHANGE_TITLE"](state, title) {
      state.title = title;
    },
    ["SET_COPYRIGHT"](state, copyright) {
      state.copyright = copyright;
    }
  },
  actions: {
    ["GET_COPYRIGHT"]({commit}) {
      return getSetting({
        fields: {
          copyright: 1
        }
      }).then(res => {
        commit("SET_COPYRIGHT", res.data.copyright);
      });
    }
  },
  modules: {
    overlay,
    log,
    theme
  },
  plugins: [
    // 解决页面刷新数据丢失 保存到
    createPersistedState()
  ]
});
