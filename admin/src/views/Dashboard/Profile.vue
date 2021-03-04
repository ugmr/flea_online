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
              设置我的资料
            </div>
            <!-- 卡片主体 -->
            <div class="card-body text-center">
              <v-form ref="form" lazy-validation>
                <v-row>
                  <v-col cols="2"></v-col>
                  <v-col cols="2">
                    <v-img
                        class="ml-12"
                        src="../../assets/imgs/avator.jpg"
                        height="128"
                        width="128"
                    ></v-img>
                    <v-btn class="mt-12 mr-6">上传头像</v-btn>
                  </v-col>
                  <v-col cols="5" class="ml-12">
                    <v-text-field
                        v-model="profile.userName"
                        label="用户名"
                    >
                    </v-text-field>

                    <v-text-field
                        v-model="profile.role"
                        label="角色"
                        disabled
                    >
                    </v-text-field>
                    <v-select
                      v-model="profile.gender"
                      :items="genderItems"
                      label="性别"
                    >
                    </v-select>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="profile.birthday"
                            label="生日"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          ref="picker"
                          v-model="profile.birthday"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          landscape
                      ></v-date-picker>
                    </v-menu>
                    <v-text-field
                        v-model="profile.address"
                        label="地址"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="8">
                    <v-textarea
                      v-model="profile.introduction"
                      label="个人简介"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
              </v-form>
              <v-btn class="mb-1" color="primary" @click="editProfile">
                保存修改
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
import { mapState } from "vuex";
export default {
  name: "Profile",
  data: () => ({
    profile: {},
    genderItems: [
      {text: "男", value: "male"},
      {text: "女", value: "female"}
    ],
    menu: false,
  }),
  computed: {
    ...mapState("log", ["userInfo"])
  },
  methods: {
    async getProfile() {
      try {
        const result = await api.getUser(this.userInfo.id);
        this.profile = result.data.item;
        this.profile.birthday = new Date(this.profile.birthday).toISOString().substr(0, 10);
      } catch {
        this.$toast("获取设置信息失败");
      }
    },
    async editProfile () {
      const valid = this.$refs.form.validate();
      if(!valid) return;
      try {
        await api.updateProfile(this.profile);
        this.$toast("个人信息修改成功")
      } catch {
        this.$toast("个人信息修改失败");
      }
      await this.getProfile();
    },
  },
  async mounted() {
    this.$store.commit("CHANGE_TITLE", "个人设置");
    await this.getProfile();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.card {
  @include card;
}
</style>