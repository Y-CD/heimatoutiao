<template>
  <div
    class="single"
    v-if="post.type == 1 && post.cover.length < 3"
    @click="$router.push({ path: `/articleDetail/${post.id}` })"
  >
    <div class="left">
      <p class="content">{{ post.title }}</p>
      <p class="info">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </p>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>

  <div
    class="single2"
    v-else-if="post.type === 2"
    @click="$router.push({ path: `/articleDetail/${post.id}` })"
  >
    <p class="content">{{ post.title }}</p>
    <div class="playarea">
      <img :src="post.cover[0].url" alt />
      <div class="playicon">
        <van-icon name="play" />
      </div>
    </div>
    <p class="info">
      <span>{{ post.user.nickname }}</span>
      <span>{{ post.comment_length }}跟帖</span>
    </p>
  </div>

  <div
    class="single3"
    v-else-if="post.type === 1 && post.cover.length >= 3"
    @click="$router.push({ path: `/articleDetail/${post.id}` })"
  >
    <p class="content">{{ post.title }}</p>
    <div class="imgs">
      <img :src="item.url" alt v-for="item in post.cover" :key="item.id" />
    </div>
    <p class="info">
      <span>{{ post.user.nickname }}</span>
      <span>{{ post.comment_length }}跟帖</span>
    </p>
  </div>
</template>

<script>
import axios from "@/utils/request.js";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 修改图片的数据结构
      if (this.post.cover.length > 2) {
        // 如果cover有多个 就遍历数组改造数据
        for (let i = 0; i < this.post.cover.length; i++) {
          // 判断 如果图片的路径不全 就不全路径 否则就直接使用数据中图片的路径
          this.post.cover[i].url =
            this.post.cover[i].url.indexOf("http") != -1
              ? this.post.cover[i].url
              : axios.defaults.baseURL + this.post.cover[i].url;
        }
      } else {
        // 只有一张图片
        // 判断 如果图片的路径不全 就不全路径 否则就直接使用数据中图片的路径
        this.post.cover[0].url =
          this.post.cover[0].url.indexOf("http") != -1
            ? this.post.cover[0].url
            : axios.defaults.baseURL + this.post.cover[0].url;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.info {
  font-size: 12px;
  padding-left: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}
.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }

  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
}
.single2 {
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
  .playarea {
    width: 100%;
    position: relative;
    margin-bottom: 10px;
    img {
      width: 100%;
      display: block;
    }
    .playicon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 0px 0px 15px #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      .van-icon {
        font-size: 40px;
        color: #fff;
        line-height: 60px;
      }
    }
  }
}
.single3 {
  width: 100vw;
  .imgs {
    width: 100%;
    display: flex;
    padding: 10px 0 0 0;
    img {
      width: 120/360 * 100vw;
      height: 70/360 * 100vw;
      // 让图片自动的调整大小，根据父容器的大小自动调整
      object-fit: cover;
      padding-right: 5px;
    }
  }
}
</style>