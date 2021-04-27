<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model.trim="userKey"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <div @click="search">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <span
        v-for="item in historyList"
        :key="item"
        @click="searchHistory(item)"
      >
        {{ item }}
        <!-- 阻止冒泡 -->
        <i @click.stop="del(item)">x</i>
      </span>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link
        :to="{ path: '/articleDetail/' + value.id }"
        v-for="value in searchList"
        :key="value.id"
        >{{ value.title }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { searchPost } from "@/apis/post.js";
export default {
  data() {
    return {
      userKey: "",
      searchList: [],
      historyList: [],
    };
  },
  methods: {
    // 点击搜索按钮
    async search() {
      let res = await searchPost(this.userKey);
      //   console.log(res);
      this.searchList = res.data.data;

      // 判断 搜索的关键字是否已经存在
      let index = this.historyList.indexOf(this.userKey);
      if (index !== -1) {
        // 已存在 先删除
        this.historyList.splice(index, 1);
      }

      // 保存历史搜索到数组中
      this.historyList.unshift(this.userKey);
      // 保存到本地存储
      localStorage.setItem("historyList", JSON.stringify(this.historyList));
    },
    // 点击历史记录搜索
    searchHistory(item) {
      this.userKey = item;
      this.search();
    },
    // 点击删除历史记录
    del(item) {
      //   console.log(item);
      // 先删除
      this.historyList = this.historyList.filter((v) => {
        return v != item;
      });
      //   console.log(res);
      // 再次存储
      localStorage.setItem("historyList", JSON.stringify(this.historyList));
    },
  },
  mounted() {
    // 页面一加载获取本地存储的历史记录
    this.historyList = JSON.parse(localStorage.getItem("historyList") || "[]");
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  span {
    display: inline-block;
    background: rgba(0, 0, 0, 0.1);
    padding: 5px;
    margin: 0 5px;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    border-radius: 18px;
    i {
      display: inline-block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      line-height: 14px;
      text-align: center;
      margin: 0 5px;
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
  }
}
</style>