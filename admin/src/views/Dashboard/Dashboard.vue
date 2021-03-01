<template>
  <div class="dashboard">
    <v-container>
      <!-- 快捷入口/待办事项 -->
      <v-row>
        <v-col rols="6">
          <v-card class="card">
            <div class="card-header card-header-primary card-header-info">
              快捷入口
            </div>
            <div class="card-body">

            </div>
          </v-card>
        </v-col>
        <v-col rols="6">
          <v-card class="card">
            <div class="card-header card-header-primary card-header-info">
              <h3>待办事项</h3>
            </div>
            <div class="card-body">

            </div>
          </v-card>
        </v-col>
      </v-row>
      <!-- 数据概览 -->
      <v-row>
        <v-col cols="12">
          <v-card class="card">
            <div class="card-header card-header-primary card-header-info">
              <v-tabs background-color="transparent">
                <v-tab>今日热搜</v-tab>
                <v-tab>今日热帖</v-tab>
              </v-tabs>
            </div>
            <div class="card-body">
              <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item"
                >
                  <v-card flat>
                    <v-card-text v-text="'asd'"></v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <!-- 今日热搜 -->
      <v-row>
        <v-col cols="12">
          <v-card class="card">
            <div class="card-header card-header-primary card-header-info">
              <v-tabs background-color="transparent">
                <v-tab>今日热搜</v-tab>
                <v-tab>今日热帖</v-tab>
              </v-tabs>
            </div>
            <div class="card-body">
              <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item"
                >
                  <v-card flat>
                    <v-card-text v-text="'asd'"></v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  mounted() {
    this.$store.commit("CHANGE_TITLE", "首页")
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.card {
  @include card;
}

</style>