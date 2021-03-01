<template>
  <div class="role">
    <v-container>
      <v-row>
        <v-col cols="12">
          <!-- 卡片 -->
          <v-card class="card">
            <!-- 卡片头部 -->
            <div class="card-header card-header-primary card-header-info">
              <v-container>
                <v-row justify="space-between">
                  <!-- 批量操作 -->
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
                    <!-- 搜索框 -->
                    <v-col cols="4">
                      <v-text-field
                          v-model="search.name"
                          label="角色"
                      ></v-text-field>
                    </v-col>
                    <!-- 搜索框 -->
                    <v-col cols="4">
                      <v-combobox
                        class="mt-2"
                        v-model="search.permission"
                        label="权限"
                        multiple
                        small-chips
                        clearable
                      >
                      </v-combobox>
                    </v-col>
                    <v-btn fab small class="mt-6 ml-3" @click="getRoleList">
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </v-row>
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
                  :items="roleList"
                  item-key="mobile"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  :loading="loading"
                  hide-default-footer
                  :show-select="isSelect"
              >
                <template v-slot:item.index="{ index }">
                  {{ (pageCount - 1) * itemsPerPage + index + 1 }}
                </template>
                <template v-slot:item.permissions="{ value }">
                  <v-chip class="ml-1 mt-1" v-for="(item, i) in value.slice(0, 3)" :key="i">
                    {{ item.name }}
                  </v-chip>
                  <span v-if="value.length > 3">  ...</span>
                </template>
                <template v-slot:item.operation="{ item }">
                  <v-btn small color="primary">
                    <v-icon small class="mr-1">mdi-square-edit-outline</v-icon>
                    编辑
                  </v-btn>
                  <v-btn small color="error" class="ml-1" :disabled="item.isSuper">
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
  name: "Role",
  data: () => ({
    search: {
      name: "",
      permission: ""
    },
    headers: [
      { text: "索引", value: "index", sortable: false },
      { text: "角色", value: "name", sortable: false },
      { text: "权限", value: "permissions", sortable: false },
      { text: "描述", value: "description", sortable: false },
      { text: "操作", value: "operation", sortable: false }
    ],
    roleList: [],
    count: 0,
    page: 1,
    pageCount: 1,
    itemsPerPage: 10,
    loading: false,
    isSelect: false
  }),
  computed: {
    creditChipColor () {
      return function (value) {
        if(value < 60) {
          return "red";
        } else if(value < 80) {
          return "yellow"
        } else {
          return "green"
        }
      }
    }
  },
  methods: {
    async getRoleList() {
      this.loading = true;
      const result = await api.getRoleList({
        conditions: {
          name: this.search.name,

        },
        options: {
          limit: this.itemsPerPage,
          skip: (this.pageCount - 1) * this.itemsPerPage
        }
      });
      this.roleList = result.data.list;
      console.log(this.roleList)
      this.count = result.data.count;
      const num = Math.ceil(this.count / this.itemsPerPage);
      this.pageCount = num <= 0 ? 1 : num;
      this.loading = false;
    },
  },
  async mounted() {
    this.$store.commit("CHANGE_TITLE", "角色管理");
    this.getRoleList();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.card {
  @include card;
}
</style>