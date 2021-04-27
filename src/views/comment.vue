<template>
  <div class="comment">
    <!-- 头部 -->
    <hm_header title="精彩评论页">
      <template #left>
        <!-- 使用vant框架的图标 -->
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_header>
    <div class="list">
      <!-- 评论内容 -->
      <div class="item" v-for="value in commentList" :key="value.id">
        <div class="head">
          <img :src="axios.defaults.baseURL + value.user.head_img" alt />
          <div>
            <p>{{ value.user.nickname }}</p>
            <span>时间</span>
          </div>
          <span @click="getComment(value)">回复</span>
        </div>

        <div class="text">{{ value.content }}</div>
        <!-- 嵌套结构 -->
        <hm_commentItem
          v-if="value.parent"
          :parent="value.parent"
          @replay="getComment"
        ></hm_commentItem>
      </div>
    </div>
    <!-- 底部模块 -->
    <hm_commentBlock
      :post="article"
      @refresh="refresh"
      :commentObj="temp"
      @cancel="temp = null"
    ></hm_commentBlock>
  </div>
</template>

<script>
import hm_header from "@/components/hm_header.vue";
import hm_commentItem from "@/components/hm_commentItem.vue";
// 底部模块
import hm_commentBlock from "../components/hm_commentBlock.vue";
import { getPostcomment, getPostDetail } from "@/apis/post.js";
import axios from "@/utils/request.js";
export default {
  components: {
    hm_header,
    hm_commentItem,
    hm_commentBlock,
  },
  data() {
    return {
      commentList: [],
      axios,
      article: {},
      // 中间变量
      temp: {},
    };
  },
  async mounted() {
    this.init();
  },
  methods: {
    async init() {
      let id = this.$route.params.id;

      // 获取文章的数据
      this.article = (await getPostDetail(id)).data.data;

      // console.log(id);
      // 获取文章评论数据
      let res = await getPostcomment(id);
      // console.log(res);
      this.commentList = res.data.data;
    },
    // 监听子组件发出的事件作出回应
    refresh() {
      this.init();
      window.scrollTo(0, 0);
    },
    // 点击回复的函数 传递数据给中间变量
    getComment(v) {
      this.temp = v;
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  padding-bottom: 60px;
}
.item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      display: block;
      border-radius: 50%;
    }
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > span {
        font-size: 12px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 20px 0 10px 0;
  }
}
</style>