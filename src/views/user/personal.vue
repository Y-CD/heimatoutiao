<template>
  <div class="personal">
    <router-link :to="'/edit_profile/' + id">
      <div class="profile">
        <img :src="userinfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="{
                iconxingbienan: userinfo.gender == 1,
                iconxingbienv: userinfo.gender == 0,
              }"
            ></span
            >{{ userinfo.nickname }}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <hmcell
      title="我的关注"
      desc="关注的用户"
      @click.native="$router.push({ path: '/myfollow' })"
    ></hmcell>
    <hmcell title="我的跟帖" desc="跟帖/回复"></hmcell>
    <hmcell title="我的收藏" desc="文章/视频"></hmcell>
    <hmcell title="设置"></hmcell>
    <hmbutton type="denger" style="margin-top: 20px" @click="exit"
      >退出</hmbutton
    >
  </div>
</template>

<script>
import hmcell from "@/components/hm_cell.vue";
import hmbutton from "@/components/hm_button.vue";
import { getUserInfo } from "@/apis/user.js";

// 引入axios
import axios from "@/utils/request.js";
export default {
  components: {
    hmcell,
    hmbutton,
  },
  data() {
    return {
      userinfo: {},
      id: "",
    };
  },
  mounted() {
    // console.log(this.$route);
    this.id = this.$route.params.id;
    // 页面一加载就获取用户数据
    getUserInfo(this.id)
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
    exit() {
      localStorage.removeItem("heimatoutiao_token");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>