import Vue from "vue";
import Vuetify, { VSnackbar, VBtn, VIcon } from "vuetify/lib";
import VuetifyToast from 'vuetify-toast-snackbar-ng';

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon,
  }
});
Vue.use(VuetifyToast, {
  x: 'right',
  y: 'top',
  color: 'info'
});

export default new Vuetify({
  theme: { dark: false },
  icons: {
    iconfont: "fa4",
  }
});
