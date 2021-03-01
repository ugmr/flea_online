export default {
  namespaced: true,
  state: {
    dark: false
  },
  mutations: {
    ['CHANGE_THEME'](state, vuetify) {
      state.dark = !state.dark;
      vuetify.theme.dark = state.dark;
    }
  }
}