<template>
  <v-app class="home">
    <!-- 应用栏 -->
    <AppBar :title="title"></AppBar>
    <!-- 导航栏 -->
    <NavBar></NavBar>
    <!-- 主体 -->
    <v-main>
      <router-view class="content"></router-view>
      <!-- 页脚 -->
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";

export default {
  name: "Dashboard",
  components: {
    NavBar,
    AppBar,
    Footer
  },
  data: () => ({
  }),
  computed: {
    ...mapState(["title"]),
    ...mapState("theme", ["dark"]),
  },
  methods: {
    changeTheme () {
      this.$store.commit("CHANGE_THEME", this.$vuetify);
    }
  },
}
</script>

<style lang="scss" scoped>
.theme--light .v-main {
  background: #f5f5f5;
}
.theme--dark .v-main {
  background: #272727;
}
.content {
  padding: 30px 15px;
  min-height: calc(100% - 57px);
}
</style>