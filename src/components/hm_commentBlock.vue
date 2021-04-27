<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @click="isFocus = !isFocus" />
      <span class="comment">
        <i class="iconfont iconpinglun-"></i>
        <em @click="$router.push({ path: `/comment/${post.id}` })">{{
          post.comment_length
        }}</em>
      </span>
      <i
        class="iconfont iconshoucang"
        :class="{ active: post.has_star }"
        @click="starActive"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" v-model.trim="content"></textarea>
      <div>
        <span @click="sendComment">发 送</span>
        <span @click="cancelReplay">取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { listStar, publishComment } from "@/apis/post.js";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    // 接收父组件传递的文章评论列表的数据
    commentObj: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isFocus: false,
      content: "",
    };
  },
  // 侦听器
  watch: {
    commentObj() {
      // 判断 如果 commentObj 为null  this.isFocus = true;
      if (this.commentObj) {
        this.isFocus = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.commtext.focus();
          }, 10);
        });
      }
    },
  },
  methods: {
    // 收藏文章函数
    async starActive() {
      let res = await listStar(this.post.id);
      // console.log(res);
      this.$toast.success(res.data.message);
      this.post.has_star = !this.post.has_star;
    },
    // 发表评论函数
    async sendComment() {
      if (this.content.length == 0) {
        this.$toast.fail("请输入评论内容");
        return;
      }
      let data = {
        content: this.content,
      };
      // 判断是否有传递参数
      if (this.commentObj) {
        data.parent_id = this.commentObj.id;
      }
      let res = await publishComment(this.post.id, data);
      // console.log(res);
      // 1.给提示
      this.$toast.success("发表评论成功");
      // 2.隐藏输入框
      this.isFocus = false;
      // 3.清空之前输入的内容
      this.content = "";
      // 4.页面内容的刷新-子组件要告诉父组件进行列表数据的刷新
      this.$emit("refresh");
    },
    // 取消回复评论
    cancelReplay() {
      this.isFocus = !this.isFocus;
      // 发出事件
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  .active {
    color: red;
  }
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  background-color: #fff;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>