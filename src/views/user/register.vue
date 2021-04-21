<template>
  <div class="container">
    <div class="close"><span class="iconfont iconicon-test"></span></div>
    <div class="logo"><span class="iconfont iconnew"></span></div>
    <div class="inputs">
      <hm_input
        placeholder="请输入手机号码"
        class="input"
        :rules="/^1[356789]\d{9}$/"
        msg="请输入11手机号码"
        v-model.trim="user.username"
      ></hm_input>
      <hm_input
        placeholder="请输入昵称"
        v-model.trim="user.nickname"
      ></hm_input>
      <hm_input
        placeholder="请输入密码"
        type="password"
        :rules="/^\w{4,16}$/"
        msg="请输入密码"
        v-model.trim="user.password"
      ></hm_input>
    </div>
    <p class="tips">
      有账号？
      <a href="#/login" class="">去登录</a>
    </p>
    <hm_button type="danger" @click="register">注册</hm_button>
  </div>
</template>

<script>
// 引入封装的按钮
import hm_button from "@/components/hm_button";
import hm_input from "@/components/hm_input";
import { userRegister } from "@/apis/user.js";
export default {
  components: {
    hm_button,
    hm_input,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: "",
      },
    };
  },
  methods: {
    register() {
      if (
        /^1[356789]\d{9}$/.test(this.user.username) &&
        /^\w{4,16}$/.test(this.user.password) &&
        this.user.nickname.length > 0
      ) {
        userRegister(this.user)
          .then((res) => {
            console.log(res);
            if (res.data.message == "注册成功") {
              this.$toast.success("注册成功");
              // 注册成功跳转到登录页面
              this.$router.push({ name: "login" });
            } else {
              this.$toast.fail("注册失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast.fail("请输入合法的手机号或者密码");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>