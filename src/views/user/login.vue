<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test" @click="close"></span>
      </div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <!-- 使用封装的输入框 -->
        <!-- 使用v-model 会为子组件的value属性赋值 -->
        <!-- v-model 会监听子组件所发出的input事件 -->
        <hm_input
          v-model="user.username"
          placeholder="请输入用户名/手机号"
          type="text"
          :rules="/^1[356789]\d{9}$|^\w{3,6}$/"
          msg="请输入正确的手机号或者用户名"
        ></hm_input>
        <hm_input
          v-model="user.password"
          placeholder="请输入密码"
          type="password"
          :rules="/^\w{4,16}$/"
          msg="请输入正确的密码"
        ></hm_input>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <!-- 使用封装的按钮 -->
      <hm_button @click="login" type="success">登陆</hm_button>
    </div>
  </div>
</template>

<script>
// 引入封装的按钮
import hm_button from "@/components/hm_button";
import hm_input from "@/components/hm_input";
import { userLogin } from "@/apis/user.js";
export default {
  // 注册
  components: {
    hm_button,
    hm_input,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login(e) {
      if (
        /^1[356789]\d{9}$|^\w{3,6}$/.test(this.user.username) &&
        /^\w{4,16}$/.test(this.user.password)
      ) {
        userLogin(this.user)
          .then((res) => {
            // console.log(res);
            if (res.data.message == "登录成功") {
              this.$toast.success("登录成功");
              // 存储token值
              localStorage.setItem("heimatoutiao_token", res.data.data.token);
              localStorage.setItem(
                "heimatoutiao_userid",
                res.data.data.user.id
              );
              // 判断 如果有参数传递过来 就跳转到参数的页面
              let redirect = window.location.href.split("=")[1];
              let url = this.$route.params.url;
              // console.log(url);
              if (redirect) {
                window.location.href = decodeURIComponent(redirect);
              } else if (url) {
                this.$router.push({ name: url });
              } else {
                // 跳转到个人中心页 需要传递id
                this.$router.push({
                  path: `/personal/${res.data.data.user.id}`,
                });
              }
            } else {
              this.$toast.fail("用户名或者密码不正确");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast.fail("请输入用户名和密码");
      }
    },
    // 点击关闭图标的处理函数
    close() {
      // console.log(1);
      // 点击关闭图标 返回首页
      this.$router.push({ name: "index" });
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