<template>
  <div id="app">
    <router-view></router-view>
    <v-overlay
      :value="overlay"
      :z-index="1000"
    >
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  data: () => ({
    //
  }),
  computed: {
    ...mapState("overlay", ["overlay"]),
    ...mapState("theme", ["dark"])
  },
  mounted() {
    this.$store.dispatch("GET_COPYRIGHT");
    this.$vuetify.theme.dark = this.dark;
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
  font-size: 14px;
}
.v-overlay {
  z-index: 1000
}
</style>
