import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import overlay from "./modules/overlay";
import log from "./modules/log";
import theme from "./modules/theme";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "",
  },
  mutations: {
    ["CHANGE_TITLE"](state, title) {
      state.title = title;
    }
  },
  modules: {
    overlay,
    log,
    theme
  },
  plugins: [
    createPersistedState()
  ]
});
