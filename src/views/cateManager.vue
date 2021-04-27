<template>
  <div>
    <!-- 头部 -->
    <hm_header title="栏目管理">
      <template #left>
        <!-- 使用vant框架的图标 -->
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_header>
    <!-- 内容 -->
    <div class="cateTop">
      <h3>点击删除栏目</h3>
      <div class="list">
        <span
          v-for="value in cateList"
          :key="value.id"
          @click="removeCateList(value)"
          >{{ value.name }}</span
        >
      </div>
    </div>
    <div class="cateBottom">
      <h3>点击添加栏目</h3>
      <div class="list">
        <span
          v-for="value in unCateList"
          :key="value.id"
          @click="addCateList(value)"
          >{{ value.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import hm_header from "@/components/hm_header.vue";
import { getCateList } from "@/apis/category.js";
export default {
  components: {
    hm_header,
  },
  data() {
    return {
      // 已添加的数组
      cateList: [],
      // 未添加的数组
      unCateList: [],
    };
  },
  async mounted() {
    // 先读取本地存储
    this.cateList = JSON.parse(localStorage.getItem("cateList"));
    // 判断 如果本地存储没有数据 就向后台发起请求
    if (!this.cateList) {
      let res = await getCateList();
      // 清除本地存储的数据
      localStorage.removeItem("unCateList");
      //   console.log(res);
      this.cateList = res.data.data;
      if (localStorage.getItem("heimatoutiao_token")) {
        this.cateList.splice(0, 2);
      } else {
        this.cateList.splice(0, 1);
      }
    }
    // 读取本地存储的数据
    this.unCateList = JSON.parse(localStorage.getItem("unCateList") || "[]");
  },
  methods: {
    removeCateList(value) {
      // 1. 先添加数据
      this.unCateList.push(value);
      // 2.移出数据
      this.cateList = this.cateList.filter((v) => {
        return v.id != value.id;
      });
      // 进行本地存储
      localStorage.setItem("cateList", JSON.stringify(this.cateList));
      localStorage.setItem("unCateList", JSON.stringify(this.unCateList));
    },
    addCateList(value) {
      // 1. 先添加数据
      this.cateList.push(value);
      // 2.移出数据
      this.unCateList = this.unCateList.filter((v) => {
        return v.id != value.id;
      });
      // 进行本地存储
      localStorage.setItem("cateList", JSON.stringify(this.cateList));
      localStorage.setItem("unCateList", JSON.stringify(this.unCateList));
    },
  },
};
</script>

<style lang="less" scoped>
.cateTop,
.cateBottom {
  padding: 10px;
  h3 {
    font-weight: 700;
    margin-bottom: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 21%;
      border: 1px solid #ccc;
      padding: 10px 0;
      text-align: center;
      margin: 6px;
    }
  }
}
</style>