<template>
  <div class="topic">
    <!-- 表格 -->
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <!-- 卡片 -->
          <v-card class="card">
            <!-- 卡片头部 -->
            <div class="card-header card-header-primary card-header-info">
              <li>1. 排序</li>
              <li>2. 搜索</li>
            </div>
            <!-- 卡片主体 -->
            <div class="card-body">
              <div class="text-center pt-2">
                <!-- 数据表格 -->
                <v-data-table
                    :headers="headers"
                    :items="topicList"
                    item-key="name"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    :loading="loading"
                    loading-text="加载中"
                >
                  <template v-slot:item.index="{ index }">
                    {{ (pageCount - 1) * itemsPerPage + index + 1 }}
                  </template>
                  <template v-slot:item.operation="{ item }">
                    <v-btn icon @click="showEditDialog(item)"><v-icon color="primary">mdi-square-edit-outline</v-icon></v-btn>
                    <v-btn icon @click="showDeleteDialog(item._id)"><v-icon color="red">mdi-delete</v-icon></v-btn>
                  </template>
                </v-data-table>
                <!-- 分页 -->
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
  name: "Topic",
  data: () => ({
    headers: [
      { text: "索引", value: "index", sortable: false },
      { text: "话题名称", value: "index", sortable: false },
      { text: "话题封面", value: "index", sortable: false },
      { text: "话题简介", value: "index", sortable: false },
      { text: "操作", value: "operation", sortable: false },
    ],
    topicList: [
    ],
    itemsPerpage: 10,
    page: 1,
    pageCount: 1,

  }),
  methods: {
    async getTopicList () {
      try {
        const result = await api.getTopicList({
          conditions: {},
          options: {
            limit: this.itemsPerpage,
            skip: (this.page - 1) * this.itemsPerpage
          }
        });
        this.topicList = result.data.list;
      } catch {
        this.$toast("获取话题列表成功");
      }
    }
  },
  async mounted() {
    this.$store.commit("CHANGE_TITLE", "话题管理");
    await this.getTopicList();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.card {
  @include card;
}
</style>