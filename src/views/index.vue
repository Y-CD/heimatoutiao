<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({ name: 'search' })">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user" @click="jump">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- 标签页 数量超过5个 标签项默认就会有滑动效果 -->
    <!-- sticky 实现顶部栏吸顶效果 -->
    <!-- swipeable 实现滑动切换效果 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="value.name" v-for="value in cateList" :key="value.id">
        <!-- 这是上拉加载组件 -->
        <van-list
          v-model="value.loading"
          :finished="value.finished"
          finished-text="没有更多了"
          loading-text="玩命加载中"
          @load="onLoad"
          :immediate-check="false"
        >
          <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
            <!-- 这里遍历的数据是每一条对应的标签项里面的数组 -->
            <hm_postBlock
              v-for="value in value.postList"
              :key="value.id"
              :post="value"
            ></hm_postBlock>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from "@/apis/category.js";
import { getPostlist } from "@/apis/post.js";
import hm_postBlock from "@/components/hm_postBlock";
export default {
  components: {
    hm_postBlock,
  },
  data() {
    return {
      // 当前被激活项的索引值
      // 这个项目打开以后应该默认选中 头条 这个栏目
      // active 的值 相当于cateList数组中的数据的索引值
      active: localStorage.getItem("heimatoutiao_token") ? 1 : 0,
      cateList: [], // tab栏的选项数据
      // postList: [],
    };
  },
  async mounted() {
    // 通过原生js 来实现点击跳转, 这里要使用箭头函数 防止this的指向改变
    document.querySelector(".van-sticky").onclick = (e) => {
      // console.log(e.target.className);
      // 判断 如果点击后的类名 是 van-sticky 就证明点击的是伪元素的位置
      if (e.target.className.indexOf("van-sticky") !== -1) {
        // 跳转到栏目管理页面
        this.$router.push({ name: "cateManager" });
      }
    };

    // 读取本地存储的数据
    this.cateList = JSON.parse(localStorage.getItem("cateList"));
    // 判断 没有就向后台发起请求获取数据
    if (!this.cateList) {
      // 获取到栏目的数据
      let res = await getCateList();
      // console.log(res);
      this.cateList = res.data.data;
    } else {
      // 本地有数据 判断是否登录
      if (localStorage.getItem("heimatoutiao_token")) {
        // 登录 就添加两条数据
        this.cateList.unshift(
          { id: 0, name: "关注", is_top: 1 },
          { id: 999, name: "头条", is_top: 1 }
        );
      } else {
        // 没有登录 就添加一条数据
        this.cateList.unshift({ id: 999, name: "头条", is_top: 1 });
      }
    }

    // 数据的改造 增加一个数组 用来存储自己的新闻数据
    this.cateList = this.cateList.map((v) => {
      return {
        ...v,
        postList: [], // 为当前栏目添加存储新闻数据的数组
        pageIndex: 1, // 当前栏目的当前页码
        pageSize: 10, // 当前栏目每一页显示的数据
        loading: false, // 当前栏目的上拉加载状态
        finished: false, // 当前栏目数据的状态
        isLoading: false, // 当前栏目下拉刷新的状态
      };
    });
    // console.log(this.cateList);
    // 页面一加载 就获取默认的要显示的数据
    this.getPost();
  },
  // 侦听器
  watch: {
    async active() {
      // 监听active的变化 去获取不同栏目的新闻数据
      // 判断 如果数据之前已经拿过了 就不用在发送请求 否则就发送请求
      if (this.cateList[this.active].postList.length == 0) {
        this.getPost();
      }
    },
  },
  methods: {
    // 封装获取栏目的新闻数据
    async getPost() {
      // 拿到id
      let id = this.cateList[this.active].id;
      // 获取到数据
      let current = (
        await getPostlist({
          category: id, // 当前栏目的id
          pageSize: this.cateList[this.active].pageSize, // 当前栏目的pageSize
          pageIndex: this.cateList[this.active].pageIndex, // 当前栏目的pageIndex
        })
      ).data.data;
      // 发送请求 拿到数据，存储到每一个栏目自己的数组中
      this.cateList[this.active].postList.push(...current);

      // 在数据请求完成后，把loading 改成false，方便下次添加
      this.cateList[this.active].loading = false;
      // 本次请求完成后修改isLoading的值为false，方便下次添加
      this.cateList[this.active].isLoading = false;

      // 判断 如果请求回来的数据小于每次请求的数据条数 就证明数据没有了 把finished 改成true
      if (current.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
    },
    // 上拉加载数据
    onLoad() {
      // 当前栏目的页码自增
      this.cateList[this.active].pageIndex++;
      // 重新发起请求获取下一页的数据
      this.getPost();
    },
    // 下拉刷新的函数
    onRefresh() {
      // 修改当前栏目的页码值为 1
      this.cateList[this.active].pageIndex = 1;
      // 先清空当前栏目的数组中的数据
      this.cateList[this.active].postList.length = 0;
      // 重新设置可能已经修改为true的finished 为false
      this.cateList[this.active].finished = false;

      this.getPost();
    },
    jump() {
      // 拿到存储的用户的ID
      let id = localStorage.getItem("heimatoutiao_userid");
      // 判断，如果有id 就证明登陆了 直接跳转到个人中心页
      if (id) {
        this.$router.push({ path: `/personal/${id}` });
      } else {
        // 如果没有登陆 就跳转到登陆页面 先登陆
        this.$toast("未登陆，请先登陆！");
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    background-color: red;
    align-items: center;
    .logo {
      color: #fff;
      .iconnew {
        font-size: 50px;
      }
    }
    .search {
      flex: 1;
      height: 40px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.6);
      margin: 0 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
    .user {
      color: #fff;
      font-size: 30px;
    }
  }
}

/deep/ .van-sticky {
  padding-right: 50px;
  &::after {
    content: "+";
    position: absolute;
    width: 51px;
    height: 44px;
    background-color: #fff;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 36px;
    font-size: 35px;
  }
}
</style>