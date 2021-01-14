<template>
  <v-main class="login">
    <div class="setting">
      <v-btn x-small fab @click="changeNetTheme" :color="this.currentTheme === 'light' ? '#fff' : '#333'">
        <v-icon v-if="this.currentTheme === 'light'">fa-lightbulb-o</v-icon>
        <v-icon v-else color="#ccc">fa-moon-o</v-icon>
      </v-btn>
    </div>
    <v-card class="login_card">
      <v-card-title class="justify-center">
        <img src="../assets/imgs/icon.png" alt="" class="title_icon" />
        <h3><span class="colorful">Matrix</span> Admin</h3>
      </v-card-title>
      <v-card-text>
        <v-form ref="loginFormRef" lazy-validation>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Name"
            type="text"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row justify="space-between">
            <v-btn text color="success" class="mr-4" to="/forget">
              Forget Password?
            </v-btn>
            <v-btn color="primary" class="mr-4" @click="login"> Login </v-btn>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <div class="background">
      <canvas ref="canvasRef"></canvas>
    </div>
    <v-overlay
        :value="overlay"
        opacity="0.3"
        z-index="100"
    >
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-alert
        :value="alert"
        type="error"
    >
      {{alertContent}}
    </v-alert>
  </v-main>
</template>

<script>
import Net from "@/libs/net.js";

let net;

export default {
  name: "Home",
  data() {
    return {
      currentTheme: "light",
      netTheme: {
        dark: {
          lineColor: "#6e4b4b",
          backgroundColor: "#292f37",
          dotColor: "#fff",
        },
        light: {
          lineColor: "#000",
          backgroundColor: "#eee",
          dotColor: "#333",
        },
      },
      username: "",
      usernameRules: [
        (v) => !!v || "Name is required",
        (v) =>
          (v.length >= 6 && v.length <= 16) ||
          "Name must between 6 and 16 charactor",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v.length >= 6 && v.length <= 16) ||
          "Password must between 6 and 16 charactor",
      ],
      overlay: false,
      alert: false,
      alertContent: '',
    };
  },
  methods: {
    changeNetTheme() {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      net.changeTheme(this.netTheme[this.currentTheme]);
    },
    login() {
      const valid = this.$refs.loginFormRef.validate();
      if(!valid) return;
      this.overlay = true;
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      }).then(() => {
        this.overlay = false;
        this.$router.push({
          name: this.$router.currentRoute.query.redirect || "Dashboard"
        });
      }, () => {
        this.overlay = false;
        this.showAlert('登陆失败');
      });
    },
    showAlert(message) {
      this.alert = true;
      this.alertContent = message;
      setTimeout(() => {
        this.alert = false;
        this.alertContent = '';
      }, 3000);
    }
  },
  mounted() {
    const el = this.$el;
    // 添加背景动画
    const cvs = this.$refs.canvasRef;
    cvs.width = el.clientWidth;
    cvs.height = el.clientHeight;
    net = new Net({
      canvas: cvs,
      dotNum: 150,
      lineDis: 10000,
      extendDis: 5,
      theme: this.netTheme[this.currentTheme],
    });
    window.onresize = function () {
      cvs.width = el.clientWidth;
      cvs.height = el.clientHeight;
    };
  },
  destroy() {
    window.onresize = null;
    net.destroy();
    net = null;
  },
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.background {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
.login_card {
  width: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.title_icon {
  margin-right: 3px;
  transform: scale(0.8);
}
.colorful {
  background: linear-gradient(to right, rgb(255, 0, 0), rgb(0, 255, 255));
  color: transparent;
  -webkit-background-clip: text;
}
.setting {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}
.v-alert {
  position: absolute;
  margin: 0 auto;
  top: 20px;
}
</style>
