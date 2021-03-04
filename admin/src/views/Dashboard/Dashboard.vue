<template>
  <div class="dashboard">
    <v-container>
      <v-row class="mb-4">
        <v-col cols="3" v-for="(item, i) in tips" :key="i">
          <Tip
              :color="item.color"
              :icon="item.icon"
              :iconText="item.iconText"
              :to="item.to"
          >
            {{item.text}}
          </Tip>
        </v-col>
      </v-row>
      <!-- 数据概览 -->
      <v-row>
        <v-col cols="12">
          <v-card class="card">
            <div class="card-header card-header-primary card-header-info">
              <v-row justify="space-between">
                <v-col align-self="center">
                  <span class="text-body-1">数据概览</span>
                </v-col>
                <v-col cols="1">
                  <Tabs v-model="chartIndex" :length="3"></Tabs>
                </v-col>
              </v-row>
            </div>
            <div class="card-body">
              <Chart :option="chartOption" width="834" height="432"></Chart>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <!-- 今日热搜 -->
      <v-row>
        <v-col cols="12">
          <v-card class="card">
            <div class="card-header card-header-primary card-header-info">
              <v-tabs background-color="transparent" v-model="tabs.key" @change="getTableList">
                <v-tab v-for="(item, i) in tabs.tables" :key="i" v-text="item.name"></v-tab>
              </v-tabs>
            </div>
            <div class="card-body">
              <v-tabs-items v-model="tabs.key">
                <v-tab-item
                    v-for="(table, i) in tabs.tables"
                    :key="i"
                >
                  <v-data-table
                      height="550"
                      :headers="table.headers"
                      :items="table.items"
                      item-key="_id"
                      :page.sync="table.page"
                      :items-per-page="table.itemsPerPage"
                      hide-default-footer
                      :loading="table.loading"
                      loading-text="加载中"
                  >
                    <template v-slot:item.index="{ index }">
                      {{ (table.page - 1) * 10 + index + 1 }}
                    </template>
                  </v-data-table>
                  <!-- 分页 -->
                  <div class="text-center pt-2">
                    <v-pagination
                        v-model="table.page"
                        :length="table.pageCount"
                        prev-icon="mdi-chevron-left"
                        next-icon="mdi-chevron-right"
                    ></v-pagination>
                  </div>
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
import Tip from "@/components/Tip";
import Chart from "@/components/Chart";
import Tabs from "@/components/Tabs";
import * as api from "@/api/api";

export default {
  name: "Dashboard",
  components: {
    Tip,
    Chart,
    Tabs
  },
  data: () => ({
    info: {
      goods: 100,
      posts: 100,
      reports: 100,
      users: 100
    },
    chartIndex: 0,
    charts: [
      {
        title: {
          text: "今日流量趋势",
          left: "45%"
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }],
        animation: true,
        tooltip: {
          trigger: 'axis'
        },
      },
      {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: '搜索引擎'},
              {value: 735, name: '直接访问'},
              {value: 580, name: '邮件营销'},
              {value: 484, name: '联盟广告'},
              {value: 300, name: '视频广告'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        animation: true
      },
      {
        title: {
          text: "最近一周的用户访问量",
          left: "45%"
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }],
        animation: true
      },

    ],
    //
    tabs: {
      key: "",
      tables: [
        {
          name: "今日热搜",
          headers: [
            {text: "索引", value: "index", width: 80},
            {text: "关键字", value: "keyword", width: 600, },
            {text: "搜索次数", value: "count"},
            {text: "用户数", value: "user"},
          ],
          items: [],
          page: 1,
          pageCount: 1,
          itemsPerPage: 10,
          loading: false
        },{
          name: "今日热帖",
          headers: [
            {text: "索引", value: "index"},
            {text: "标题", value: "title",},
            {text: "发帖者", value: "userId"},
            {text: "话题", value: "topic"},
            {text: "点击数", value: "click"},
          ],
          items: [],
          page: 1,
          pageCount: 1,
          itemsPerPage: 10,
          loading: false
        }
      ]
    },
  }),
  computed: {
    tips() {
      return [
        {
          text: this.info.goods + "元",
          icon: "mdi-cart",
          iconText: "新增商品",
          color: "primary",
          to: "/goods"
        },
        {
          text: this.info.posts + "条",
          icon: "mdi-chat-processing",
          iconText: "新增帖子",
          color: "warning",
          to: "/post"
        },  {
          text: this.info.reports + "条",
          icon: "mdi-alert-octagon",
          iconText: "新增举报",
          color: "error",
          to: "/report"
        },  {
          text: this.info.users + "名",
          icon: "mdi-account",
          iconText: "新增用户",
          color: "primary",
          to: "/user"
        }
      ]
    },
    chartOption() {
      return this.charts[this.chartIndex];
    }
  },
  methods: {
    async getHotSearchList() {
      try {
        const table = this.tabs.tables[0];
        const result = await api.getHotSearchList({
          options: {
            limit: table.itemsPerPage,
            skip: (table.page - 1) * table.itemsPerPage
          }
        });
        table.items = result.data.list;
        const num = Math.floor(result.data.count / table.itemsPerPage);
        table.pageCount = num === 0 ? 1 : num;
      } catch(e) {
        console.log(e);
        this.$toast("获取今日热搜列表失败");
      }
    },
    async getHotPostList() {
      try {
        const table = this.tabs.tables[1];
        const result = await api.getHotPostList({
          options: {
            limit: table.itemsPerPage,
            skip: (table.page - 1) * table.itemsPerPage
          }
        });
        table.items = result.data.list;
        table.pageCount = result.data.count / table.itemsPerPage;
      } catch(e) {
        console.log(e);
        this.$toast("获取今日热帖列表失败");
      }
    },
    async getTableList(number) {
      if(number ===  0) {
        await this.getHotSearchList()
      } else if(number === 1) {
        await this.getHotPostList();
      }
    }
  },
  mounted() {
    this.$store.commit("CHANGE_TITLE", "首页");
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.card {
  @include card;
}

.chart {
  margin: 0 auto;
}


</style>