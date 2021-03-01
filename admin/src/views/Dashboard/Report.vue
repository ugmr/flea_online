<template>
  <div class="report">
    <!-- 表格 -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <!-- 卡片 -->
          <v-card class="card">
            <!-- 卡片头部 -->
            <div class="card-header card-header-primary card-header-info">
              <v-container>
                <v-row justify="space-between">
                  <!-- 搜索框 -->
                  <v-col cols="4">
                    <v-text-field
                        dense
                        label="搜索"
                        v-model="search"
                    >
                      <template v-slot:append-outer>
                        <v-btn fab small class="mt--1" @click="getAdvertList">
                          <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </v-col>
                  <!-- 添加按钮 -->
                  <v-col cols="1">
                    <v-btn class="mt--1" @click="showAddDialog">
                      添加
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <!-- 卡片主体 -->
            <div class="card-body">
              <!-- 数据表格 -->
              <v-data-table
                  :headers="headers"
                  :items="adverts"
                  item-key="name"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  hide-default-footer
                  :loading="loading"
              >
                <template v-slot:item.index="{ index }">
                  {{ (pageCount - 1) * itemsPerPage + index + 1 }}
                </template>
                <template v-slot:item.operation="{ item }">
                  <v-btn icon @click="showEditDialog(item)"><v-icon color="primary">mdi-square-edit-outline</v-icon></v-btn>
                  <v-btn icon @click="showDeleteDialog(item._id)"><v-icon color="red">mdi-delete</v-icon></v-btn>
                </template>
                <template v-slot:item.isUsed="{ value }">
                  <v-chip color="success" v-if="value">已应用</v-chip>
                  <v-chip color="red" v-else>未应用</v-chip>
                </template>
                <template v-slot:item.type="{ value }">
                  {{ typeText(value) }}
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
export default {
  name: "Report",
  mounted() {
    this.$store.commit("CHANGE_TITLE", "举报管理");
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.card {
  @include card;
}
</style>