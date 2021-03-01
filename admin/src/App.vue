<template>
  <div id="app">
    <router-view></router-view>
    <v-overlay :value="overlay">
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
  methods: {
  },
  computed: {
    ...mapState("overlay", ["overlay"])
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
</style>
