<template>
  <div class="permission">
    <v-container>
      <v-row>
        <v-col cols="12">
          <!-- 卡片 -->
          <v-card class="card">
            <!-- 卡片头部 -->
            <div class="card-header card-header-primary card-header-info">
              <v-container>
                <v-row>
                  <v-col cols="3">
                    <v-text-field
                        v-model="search"
                        label="权限"
                        clearable
                        hint=""
                    >
                    </v-text-field>
                  </v-col>
                  <v-btn fab small class="mt-6 ml-2" @click="getPermissionList()">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </v-row>
              </v-container>
            </div>
            <!-- 卡片主体 -->
            <div class="card-body">
              <!-- 数据表格 -->
              <v-data-table
                  :headers="headers"
                  :items="permissionList"
                  item-key="name"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  :loading="loading"
                  loading-text="加载中"
                  hide-default-footer
                  show-expand
              >
                <template v-slot:item.index="{ index }">
                  {{ (pageCount - 1) * itemsPerPage + index + 1 }}
                </template>
                <template v-slot:expanded-item="{ item, index }">
                  {{index}}
                  <td :colspan="headers.length" v-if="item.children">
                    <v-data-table
                        class="mt-2 mb-2"
                        :headers="itemHeaders"
                        :items="item.children"
                        item-key="name"
                        hide-default-footer
                    >
                      <template v-slot:item.index="{ index }">
                        {{ (index + 1) }}
                      </template>
                    </v-data-table>
                  </td>

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
  name: "Permission",
  data: () => ({
    search: "",
    headers: [
      {text: "索引", value: "index", sortable: false },
      {text: "权限名称", value: "name", sortable: false},
      {text: "权限路径", value: "path", sortable: false},
      {text: "权限描述", value: "description", sortable: false},
      {value: 'data-table-expand' }
    ],
    permissionList: [],
    count: 1,
    page: 1,
    pageCount: 1,
    itemsPerPage: 10,
    loading: false,
    itemHeaders: [
      {text: "索引", value: "index", sortable: false},
      {text: "子权限名称", value: "name", sortable: false},
      {text: "权限方法", value: "method", sortable: false},
      {text: "权限描述", value: "description", sortable: false}
    ]
  }),
  methods: {
    async getPermissionList () {
      try {
        this.loading = true;
        const result = await api.getPermissionList({
          conditions: {
            name: this.search,
          },
          options: {
            limit: this.itemsPerPage,
            skip: (this.page - 1) * this.itemsPerPage,
          }
        });
        this.permissionList = result.data.list;
        this.count = result.data.count;
        const num = Math.ceil(this.count / this.itemsPerPage);
        this.pageCount = num <= 0 ? 1 : num;
        console.log(this.permissionList)
      } catch {
        this.$toast("获取权限列表失败");
      }
      this.loading = false;
    },
  },
  async mounted() {
    this.$store.commit("CHANGE_TITLE", "权限管理");
    await this.getPermissionList();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.v-data-table::v-deep .v-data-table__expand-icon {
  font-size: 14px;
}

.card {
  @include card;
}
</style>