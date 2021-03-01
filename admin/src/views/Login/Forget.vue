<template>
  <v-card class="forget_card">
    <v-card-title>
      <div class="absolute">
        <v-btn
          text
          color="primary"
          v-show="step === 1"
          to="/login"
        >
          <v-icon class="mb-05 mr-2">fa-angle-left</v-icon>
          返回登陆
        </v-btn>
        <v-btn
            text
            color="primary"
            v-show="step === 2"
            @click="prevStep"
        >
          <v-icon class="mb-05 mr-2">fa-angle-left</v-icon>
          上一步
        </v-btn>
      </div>
      <h3>忘记密码</h3>
    </v-card-title>
    <v-card-text>
      <div class="step_items">
        <transition name="slide-fade">
          <div class="step_content" v-show="step === 1">
            <v-form lazy-validation>
              <v-container>
                <v-row>
                  <v-text-field
                      v-model="mobile"
                      :rules="mobileRules"
                      label="手机号码"
                      type="text"
                      required
                  ></v-text-field>
                </v-row>
                <v-row>
                  <drag-verify
                      width="358"
                      ref="dragVerify"
                      :isPassing.sync="isPassing"
                      text="请按住滑块拖动"
                      successText="验证通过"
                      handlerIcon="fa fa-angle-double-right"
                      successIcon="fa fa-check-circle"
                  >
                  </drag-verify>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                        :counter="6"
                        v-model="code"
                        :rules="codeRules"
                        label="验证码"
                        type="text"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn block color="primary">
                      获取验证码
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </div>
          <div class="step_content" v-show="step === 2">
            <v-form  lazy-validation>
              <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="新密码"
                  type="text"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="repeat"
                  :rules="passwordRules"
                  label="重复密码"
                  type="text"
                  required
              ></v-text-field>
            </v-form>
          </div>
          <div class="step_content text-center" v-show="step === 3">
            <img src="../../assets/imgs/complete.png" alt="complete" width="50" height="50">
            <p class="text-body-1 mt-4">修改密码成功！</p>
          </div>
        </transition>
      </div>

    </v-card-text>
    <v-card-actions>
      <div class="step_actions">
        <v-btn
            block
            color="primary"
            v-show="step === 1"
            @click="checkCode"
        >
          下一步
        </v-btn>
        <v-btn
            block
            color="primary"
            v-show="step === 2"
            @click="checkCode"
        >
          下一步
        </v-btn>
        <v-btn
            block
            color="primary"
            v-show="step === 3"
            to="/login"
        >
          立即登陆
        </v-btn>
      </div>
    </v-card-actions>
    <!-- 页脚 版权信息 -->
    <div class="v-card-footer">
     © 2015-2016 DeathGhost 版权所有
     <br/>
     陕B2-20080224-1
    </div>
  </v-card>
</template>

<script>
import dragVerify from "vue-drag-verify2";
const mpattern = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;

export default {
  name: "Forget",
  components: {
    dragVerify
  },
  data: () => ({
    step: 1,
    forget: false,
    mobile: '',
    mobileRules: [
      (v) => !!v || "手机号码不能为空",
      (v) => mpattern.test(v) || "手机号码不合法",
    ],
    code: '',
    codeRules: [
      (v) => !!v || "验证码不能为空",
      (v) => (v.length === 6) || "密码不合法",
    ],
    isPassing: false
  }),
  methods: {
    getCode () {

    },
    checkCode () {
      this.nextStep()
    },
    nextStep () {
      this.step += 1;
      if  (this.step > 3) {
        this.step = 1;
      }
    },
    prevStep () {
      this.step -= 1;
      if  (this.step <= 0) {
        this.step = 1;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.forget_card {
  width: 400px;
  left: calc(50% - 200px);
  top: calc(50% - 250px);
  padding: 15px 8px 0px 8px;
  z-index: 10;
  user-select: none;

  &::v-deep .v-card__title {
    position: relative;
    padding-bottom: 20px;
    margin-bottom: 30px;
    border-bottom: 1px solid #aaa;

    .absolute {
      position: absolute;
      margin-left: -15px;
    }
  }

  .title_icon {
    margin-right: 3px;
    transform: scale(0.8);
  }

  .v-card-footer {
    margin-top: 10px;
    padding: 10px 0;
    border-top: 1px solid #aaa;
    color: #555;
    text-align: center;
  }
}

h3 {
  width: 100%;
}

.step_actions{
  display: block;
  width: 100%;
  & .v-btn + .v-btn {
    margin: 0;
  }
}

.mb-05 {
  margin-bottom: 3px;
}

.drag_verify {
  margin: 20px 0 30px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>