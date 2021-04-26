<template>
  <div>
    <!-- 头部 -->
    <hm_header title="我的关注">
      <template #left>
        <!-- 使用vant框架的图标 -->
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_header>
    <!-- 列表 -->
    <div class="list" v-for="(value, index) in followList" :key="value.id">
      <div class="box">
        <img :src="value.head_img" alt="" />
        <div class="center">
          <p>{{ value.nickname }}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="cancelFollow(value.id, index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import hm_header from "@/components/hm_header.vue";
import { getUserFollow, unfollowUser } from "@/apis/user.js";
import axios from "../../utils/request.js";
export default {
  components: {
    hm_header,
  },
  data() {
    return {
      followList: [], // 关注的用户的数据数组
    };
  },
  async mounted() {
    // 页面一加载获取关注的用户的数据
    let res = await getUserFollow();
    // console.log(res);
    this.followList = res.data.data.map((v) => {
      v.head_img = axios.defaults.baseURL + v.head_img;
      return v;
    });
  },
  methods: {
    // 取消关注
    async cancelFollow(id, index) {
      // 取消关注的api方法
      let res = await unfollowUser(id);
      // 取消成功后，在数组中删除对应的数据 实现页面刷新的效果
      this.followList.splice(index, 1);
      // 提示
      this.$toast.success(res.data.message);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>