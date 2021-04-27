<template>
  <div>
    <!-- 头部 -->
    <hm_header title="我的收藏">
      <template #left>
        <!-- 使用vant框架的图标 -->
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_header>
    <!-- 内容部分 -->
    <van-swipe-cell v-for="(value, index) in starList" :key="value.id">
      <hm_postBlock :post="value"></hm_postBlock>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="cancelStar(value.id, index)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import hm_header from "@/components/hm_header.vue";
import hm_postBlock from "@/components/hm_postBlock";
import { getUserStar } from "@/apis/user.js";
import { listStar } from "@/apis/post.js";
export default {
  components: {
    hm_header,
    hm_postBlock,
  },
  data() {
    return {
      starList: [],
    };
  },
  async mounted() {
    // 页面加载获取收藏的文章的信息
    let res = await getUserStar();
    // console.log(res);
    this.starList = res.data.data;
  },
  methods: {
    async cancelStar(id, index) {
      //   console.log(id);
      let res = await listStar(id);
      //   console.log(res);
      this.starList.splice(index, 1);
      this.$toast.success(res.data.message);
    },
  },
};
</script>

<style lang="less" scoped>
.delete-button {
  height: 70%;
  margin: 30% 0 0 0;
}
</style>