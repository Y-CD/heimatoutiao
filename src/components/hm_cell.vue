<template>
  <div class="hmcell">
    <div class="left">{{ title }}</div>
    <div class="right">
      <span>{{ desc }}</span>
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      // 设置为必传
      required: true,
    },
    desc: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.hmcell {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .right {
    font-size: 12px;
    color: #999;
    > span {
      vertical-align: middle;
    }
  }
}
</style>