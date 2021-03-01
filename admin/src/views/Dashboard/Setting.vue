<template>
  <div class="setting">
    <!-- 表格 -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <!-- 卡片 -->
          <v-card class="card">
            <!-- 卡片头部 -->
            <div class="card-header card-header-primary card-header-info">
              <h3>网站设置</h3>
            </div>
            <!-- 卡片主体 -->
            <div class="card-body text-center">
              <v-form ref="form" lazy-validation>
                <v-container>
                  <v-col cols="6">
                    <v-text-field
                        v-model="setting.name"
                        label="网站名称"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                        v-model="setting.domain"
                        label="网站域名"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                        v-model="setting.title"
                        label="网站首页标题"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                        v-model="setting.keywords"
                        label="网站关键字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-textarea
                        v-model="setting.description"
                        label="网站描述"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                        v-model="setting.copyright"
                        label="版权信息"
                    >
                    </v-text-field>
                  </v-col>
                </v-container>
              </v-form>
              <v-btn class="mb-1" color="primary" @click="editSetting">
                保存设置
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as api from "@/api/api.js";

export default {
  name: "Setting",
  data: () => ({
    setting: {}
  }),
  methods: {
    async getSetting () {
      try {
        const result = await api.getSetting();
        this.setting = result.data.setting;
      } catch {
        this.$toast("获取设置信息失败");
      }
    },
    async editSetting () {
      const valid = this.$refs.form.validate();
      if(!valid) return;
      try {
        await api.editSetting(this.setting);
        this.$toast("修改设置成功")
      } catch {
        this.$toast("修改设置失败");
      }
      this.getSetting();
    }
  },
  mounted() {
    this.$store.commit("CHANGE_TITLE", "网站设置");
    this.getSetting();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.card {
  @include card;
}
</style>