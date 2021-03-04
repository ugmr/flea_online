<template>
  <div class="admin">
    <v-container>
      <v-row>
        <v-col cols="12">
          <!-- 卡片 -->
          <v-card class="card">
            <!-- 卡片头部 -->
            <div class="card-header card-header-primary card-header-info">
              <v-container>
                <v-row justify="space-between">
                  <v-col v-if="!isSelect">
                    <v-btn @click="isSelect = true">
                      批量操作
                    </v-btn>
                  </v-col>
                  <v-col v-else>
                    <v-btn class="mr-2" @click="isSelect = false">取消</v-btn>
                    <v-btn>删除</v-btn>
                  </v-col>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                          v-model="search.userName"
                          label="昵称"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                          v-model="search.mobile"
                          label="手机号码"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-select
                        v-model="search.gender"
                        :items="genderItems"
                        label="性别"
                        clearable
                      >
                      </v-select>
                    </v-col>
                    <v-btn fab small class="mt-5 ml-4" @click="getUserList">
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </v-row>
                  <v-space></v-space>
                  <v-col cols="1">
                    <v-btn>添加</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <!-- 卡片主体 -->
            <div class="card-body">
              <!-- 数据表格 -->
              <v-data-table
                :headers="headers"
                :items="userList"
                item-key="mobile"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                :loading="loading"
                loading-text="加载中"
                hide-default-footer
                :show-select="isSelect"
              >
                <template v-slot:item.index="{ index }">
                  {{ (pageCount - 1) * itemsPerPage + index + 1 }}
                </template>
                <template v-slot:item.createAt="{ value }">
                  {{value.slice(0,10)}}
                </template>
                <template v-slot:item.gender="{ value }">
                  {{ value == "male" ? "男" : "女" }}
                </template>
                <template v-slot:item.credit="{ value }">
                  <v-chip outlined :color="creditChipColor(value)">
                    {{ value }}
                  </v-chip>
                </template>
                <template v-slot:item.operation>
                  <v-btn small color="primary">
                    <v-icon small class="mr-1">mdi-square-edit-outline</v-icon>
                    编辑
                  </v-btn>
                  <v-btn small color="error" class="ml-1">
                    <v-icon small class="mr-1">mdi-delete</v-icon>
                    删除
                  </v-btn>
                </template>
              </v-data-table>
              <!-- 分页 -->
              <div class="text-center pt-2">
                <v-pagination
                    v-model="page"
                    :length="pageCount"
                    prev-icon="mdi-chevron-left"
                    next-icon="mdi-chevron-right"
                ></v-pagination>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as api from "@/api/api";

export default {
  name: "Admin",
  data: () => ({
    headers: [
      { text: "索引", value: "index", sortable: false },
      { text: "昵称", value: "userName", sortable: false},
      { text: "手机号码", value: "mobile", sortable: false},
      { text: "性别", value: "gender", sortable: false },
      { text: "信誉分", value: "credit", sortable: true},
      { text: "创建时间", value: "createAt" },
      { text: "操作", value: "operation", sortable: false}
    ],
    userList: [],
    count: 0,
    page: 1,
    pageCount: 1,
    itemsPerPage: 10,
    loading: false,
    search: {
      userName: "",
      mobile: "",
      gender: "",
    },
    genderItems: [
      {text: "男", value: "male"},
      {text: "女", value: "female"}
    ],
    isSelect: false
  }),
  computed: {
    creditChipColor () {
      return function (value) {
        if(value < 60) {
          return "red";
        } else if(value < 80) {
          return "orange"
        } else {
          return "green"
        }
      }
    }
  },
  methods: {
    async getUserList() {
      this.loading = true;
      const result = await api.getUserList({
        conditions: this.search,
        options: {
          limit: this.itemsPerPage,
          skip: (this.pageCount - 1) * this.itemsPerPage
        }
      });
      this.userList = result.data.list;
      this.count = result.data.count;
      const num = Math.ceil(this.count / this.itemsPerPage);
      this.pageCount = num <= 0 ? 1 : num;
      console.log(this.userList)
      this.loading = false;
    },
  },
  async mounted() {
    this.$store.commit("CHANGE_TITLE", "网站用户管理");
    this.getUserList();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.card {
  @include card;
}
</style>