<template>
  <div class="examine">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="card">
            <div class="card-header card-header-info card-header-primary">
              <v-container>
                <v-row justify="space-between">
                  <v-col>
                    <v-tabs background-color="transparent">
                      <v-tab>待审核</v-tab>
                      <v-tab>已通过</v-tab>
                    </v-tabs>
                  </v-col>
                  <v-col cols="2" align-self="center">
                    <v-btn text color="primary" to="/goods">
                      查看全部商品
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div class="card-body">
              <v-data-table
                :headers="headers"
                :items="adverts"
                item-key="name"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                :loading="loading"
                loading-text="加载中"
              >
              </v-data-table>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Examine",
  data: () => ({
    list: [],
    headers: [
      { text: '索引', value: 'index', sortable: false },
      { text: '名称', value: 'name', sortable: false },
      { text: '发布者', value: 'userId', sortable: false },
      { text: '分类', value: 'category', sortable: false },
      { text: '操作', value: 'operation', sortable: false },
    ],
    page: 1,
    pageCount: 1,
    itemsPerPage: 10,
    loading:false,
  }),
  methods: {
    getSolvedList() {

    }
  },
  mounted() {
    this.$store.commit("CHANGE_TITLE", "商品审核");
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.card {
  @include card;
}
</style>