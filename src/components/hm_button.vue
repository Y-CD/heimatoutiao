<template>
  <div
    class="btn"
    @click="handlerClick"
    :class="{
      denger: type === 'denger',
      primary: type === 'primary',
      success: type === 'success',
    }"
  >
    <!-- 使用匿名插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
  },
  methods: {
    handlerClick(e) {
      // 当用户点击了子组件 就需要告诉父组件有人点击了按钮 实现响应
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  width: 318 * 100vw/360;
  height: 50px;
  background-color: rgb(183, 184, 182);
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 20px;
  margin: 0 auto;
}
.denger {
  background-color: rgb(223, 24, 24);
  color: #fff;
}
.primary {
  background-color: rgb(71, 24, 223);
  color: #fff;
}
.success {
  background-color: rgb(23, 148, 85);
  color: #fff;
}
</style>