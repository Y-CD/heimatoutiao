<template>
  <div class="edit_profile">
    <hmheader title="个人信息编辑">
      <!-- 使用具名插槽 #插槽的name值 -->
      <template #left>
        <!-- 使用vant框架的图标 -->
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #right>
        <!-- 使用vant框架的图标 -->
        <van-icon name="wap-home-o" @click="$router.push({ name: 'index' })" />
      </template>
    </hmheader>
    <div class="imgarea">
      <img :src="userinfo.head_img" alt="" />
      <!-- 使用vant框架的文件上传模块 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- native可以监听到事件的根元素的原生事件 -->
    <hmcell
      title="昵称"
      :desc="userinfo.nickname"
      @click.native="showNickname"
    ></hmcell>
    <!-- 修改昵称的模态框 -->
    <!-- confirm 是模态框点击确定触发的事件 -->
    <!-- v-model="nicknameShow" 是控制元素的显示与隐藏的 nicknameShow  是Boolean值 -->
    <van-dialog
      v-model="nicknameShow"
      title="编辑昵称"
      show-cancel-button
      @confirm="updateNickname"
    >
      <!-- 这里的v-model绑定的变量不能是和hmcell同一个变量 -->
      <van-field
        v-model="nickname"
        required
        label="昵称"
        placeholder="请输入昵称"
      />
    </van-dialog>

    <!-- 这里的点击事件点击显示模态框 并且每次点击都清空模态框里面的输入框为空 -->
    <hmcell title="密码" desc="******" @click.native="showPass"></hmcell>

    <!-- 修改密码的模态框 -->
    <van-dialog
      v-model="passwordShow"
      title="修改密码"
      show-cancel-button
      @confirm="updatePassword"
      :beforeClose="beforeClose"
    >
      <van-field
        v-model.trim="oidpassword"
        required
        label="旧密码"
        placeholder="请输入旧密码"
        type="password"
        ref="input1"
      />
      <van-field
        v-model.trim="newpassword"
        required
        label="新密码"
        placeholder="请输入新密码"
        type="password"
      />
    </van-dialog>

    <hmcell
      title="性别"
      :desc="userinfo.gender == 1 ? '男' : '女'"
      @click.native="genderShow = !genderShow"
    ></hmcell>
    <!-- ActionSheet 面板 -->
    <!-- :close-on-click-action="true" 是点击选项后关闭面板 -->
    <!-- :actions="actions" 是数据的选项面板 -->
    <van-action-sheet
      v-model="genderShow"
      :actions="actions"
      @select="onSelect"
      :close-on-click-action="true"
    />
  </div>
</template>

<script>
import hmheader from "@/components/hm_header.vue";
import hmcell from "@/components/hm_cell.vue";
import { uploadFile } from "@/apis/fileUpload.js";
import { getUserInfo, updateUserInfo } from "@/apis/user.js";

// 引入axios
import axios from "@/utils/request.js";
export default {
  components: {
    hmheader,
    hmcell,
  },
  data() {
    return {
      userinfo: {},
      nicknameShow: false,
      // 昵称 的变量
      nickname: "",
      passwordShow: false,
      // 新密码 的变量
      newpassword: "",
      // 旧密码 的变量
      oidpassword: "",
      genderShow: false,
      // 动作面板的数据源
      actions: [{ name: "男" }, { name: "女" }],
    };
  },
  mounted() {
    getUserInfo(this.$route.params.id)
      .then((res) => {
        // console.log(res);
        this.userinfo = res.data.data;
        // 拼接图片的路径
        this.userinfo.head_img =
          axios.defaults.baseURL + this.userinfo.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      let formdata = new FormData();
      formdata.append("file", file.file);
      uploadFile(formdata)
        .then((res) => {
          // console.log(res);
          // res.data.data.url 是上传图片成功返回的图片路径
          // 拼接图片路径
          // console.log(res.data.data.url);
          if (res.data.message == "文件上传成功") {
            this.userinfo.head_img = axios.defaults.baseURL + res.data.data.url;

            // 实现用户头像编辑
            updateUserInfo(this.$route.params.id, {
              head_img: res.data.data.url,
            })
              .then((res) => {
                // console.log(res);
                if (res.data.message == "修改成功") {
                  this.$toast("头像修改成功");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示修改昵称的模态框
    showNickname() {
      // 点击后显示模态框
      this.nicknameShow = !this.nicknameShow;
      // 点击弹出模态框后改变nickname的值，实现数据的渲染
      this.nickname = this.userinfo.nickname;
    },
    // 修改昵称
    updateNickname() {
      updateUserInfo(this.$route.params.id, {
        nickname: this.nickname,
      }).then((res) => {
        // console.log(res);
        if (res.data.message == "修改成功") {
          // 修改成功 改变userinfo里面的nickname的值 实现页面的更新效果
          this.$toast("昵称修改成功");
          this.userinfo.nickname = this.nickname;
        }
      });
    },
    // 显示修改密码的模态框
    showPass() {
      this.passwordShow = true;
      this.oidpassword = this.newpassword = "";
      // $nextTick 是等组件加载完成在执行回调函数
      this.$nextTick(() => {
        // this.$refs.input1 拿到的是组件 组件里面有$refs 里面有input
        // console.log(this.$refs.input1);
        // 拿到input
        this.$refs.input1.$refs.input.focus();
      });
    },
    // 修改密码
    async updatePassword() {
      // 提交之前 判断输入的旧密码是否正确
      if (this.oidpassword == this.userinfo.password) {
        // console.log(1);
        if (/^\w{3,16}$/.test(this.newpassword)) {
          let res = await updateUserInfo(this.$route.params.id, {
            password: this.newpassword,
          });
          // console.log(res);
          this.userinfo.password = this.newpassword;
          this.$router.push({ name: "login" });
        } else {
          this.$toast.fail("请输入合法的3~16位的密码");
        }
      } else {
        this.$toast.fail("原密码不正确");
      }
    },
    // 控制编辑密码的模态框的显示与隐藏
    beforeClose(action, done) {
      // console.log(action); // action 可以获取到点击的是确认还是取消
      // 判断点击的是确认
      if (action == "confirm") {
        // 判断，如果旧密码输入不正确 模态框不关闭
        if (
          this.oidpassword !== this.userinfo.password ||
          !/^\w{3,16}$/.test(this.newpassword)
        ) {
          done(false);
        } else {
          done();
        }
      } else {
        // 这里是点击取消，关闭模态框
        done();
      }
    },
    // 修改性别的处理函数
    async onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // console.log(item); // item 是获取到的是数据源的对象 就是选项
      let gender = item.name == "男" ? 1 : 0;
      let res = await updateUserInfo(this.$route.params.id, {
        gender,
      });
      // console.log(res);
      if (res.data.message == "修改成功") {
        // 提示
        this.$toast.success(res.data.message);
        // 修改绑定的数据 实现页面刷新效果
        this.userinfo.gender = gender;
      } else {
        this.$toast.fail("修改失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.edit_profile {
  .imgarea {
    position: relative;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    > img {
      width: 100px;
      height: 100px;
      display: block;
    }
    // 设置/deep/ 可以影响子组件的样式
    /deep/ .van-uploader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    /deep/ .van-uploader__upload {
      width: 100px;
      height: 100px;
      margin: 0;
    }
  }
}
</style>