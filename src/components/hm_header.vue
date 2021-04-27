<template>
  <div class="header">
    <div class="left">
      <!-- 添加具名插槽 -->
      <slot name="left"></slot>
    </div>
    <div class="center">{{ title }}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "my-header",
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
  .right {
    font-size: 20px;
  }
  .center {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>