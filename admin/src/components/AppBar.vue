<template>
  <v-app-bar absolute flat app color="transparent" height="72">
    <div class="app-bar-title">
      {{title}}
    </div>
    <!-- 空白占位 -->
    <v-spacer></v-spacer>
    <!-- 主题切换 -->
    <v-btn
        small
        icon
        class="mr-4"
        depressed
        @click="changeTheme"
    >
      <v-icon v-if="!dark" >fa-lightbulb-o</v-icon>
      <v-icon v-else>fa-moon-o</v-icon>
    </v-btn>
    <!-- 用户 -->
    <v-menu
        transition="slide-x-transition"
        bottom
        left
        offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            small
            icon
            class="mr-4"
            depressed
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list link rounded>
        <v-list-item class="pl-6 pr-6">
          <v-list-item-content>
            <v-list-item-title v-text="'个人资料'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pl-6 pr-6">
          <v-list-item-content>
            <v-list-item-title v-text="'修改密码'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mb-2"></v-divider>

        <v-list-item class="pl-6 pr-6">
          <v-list-item-content>
            <v-list-item-title v-text="'退出'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppBar",
  props: {
    title: String,
  },
  computed: {
    ...mapState("theme", ["dark"]),
    ...mapState("log", ["userInfo"]),
  },
  methods: {
    changeTheme() {
      this.$store.commit("theme/CHANGE_THEME", this.$vuetify);
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar-title {
  margin-left: 20px;
  font-size: 20px;
}
</style>