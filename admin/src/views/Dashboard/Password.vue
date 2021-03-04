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
              <h4>修改密码</h4>
            </div>
            <!-- 卡片主体 -->
            <div class="card-body text-center">
              <v-container class="mt-12">
                <v-row class="justify-center">
                  <v-col cols="3">
                    <v-form ref="form" lazy-validation>
                      <v-text-field
                          v-model="password"
                          :error-messages="passwordErrors"
                          label="新密码"
                          type="password"
                          required

                      ></v-text-field>
                      <v-text-field
                          v-model="repeat"
                          :error-messages="repeatErrors"
                          label="重复密码"
                          type="password"
                          required

                      ></v-text-field>
                    </v-form>
                    <v-btn class="mb-12 mt-12" color="primary" @click="editPassword">
                      修改密码
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
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
import { validationMixin } from 'vuelidate';
import { minLength, required, maxLength, sameAs } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  name: "Password",
  validations: {
    password: { required, maxLength: maxLength(20), minLength: minLength(6)},
    repeat: { sameAsPassword: sameAs("password")}
  },
  data: () => ({
    password: '',
    repeat: '',
  }),
  computed: {
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.checked && errors.push('密码长度应在6-20之间');
      return errors
    },
    repeatErrors() {
      const errors = []
      if (!this.$v.repeat.$dirty) return errors
      !this.$v.repeat.checked && errors.push('两次密码不一致');
      return errors
    },
    ...mapState("log", ["userInfo"])
  },
  methods: {
    async editPassword () {
      try {
        await api.updatePassword({
          password: this.password
        });
        this.$toast("密码修改成功")
      } catch {
        this.$toast("密码修改失败");
      }
      this.password = '';
      this.repeat = '';
    }
  },
  async mounted() {
    this.$store.commit("CHANGE_TITLE", "修改密码");
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.card {
  @include card;
}
</style>