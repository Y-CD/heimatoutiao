<template>
  <input
    class="hminput"
    :[pn]="{ success: flag, error: !flag }"
    @input="handlerInput"
    @blur="handlerBlur"
  />
</template>

<script>
export default {
  // props 接收父组件的数据
  props: {
    rules: {
      type: RegExp,
    },
    // 接收传递的要提示的错误信息 没有传递有一个默认值
    msg: {
      type: String,
      default: "输入错误",
    },
  },
  data() {
    return {
      flag: "",
      pn: "aa",
    };
  },
  methods: {
    handlerInput(e) {
      let value = e.target.value;
      if (this.rules) {
        // 当用户输入之后 pn就变成class 就可以实现动态添加类名
        this.pn = "class";
        // 进行用户校验 添加不同的样式
        if (this.rules.test(value)) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      }
      // 传递数据给父组件 传递 input 事件类型
      // v-model 会监听到子组件发出的input事件
      this.$emit("input", value);
    },
    // 绑定失焦事件
    handlerBlur(e) {
      let value = e.target.value;
      if (this.rules) {
        // 进行用户校验 如果有错误 就提示用户
        if (!this.rules.test(value)) {
          // console.log(this.msg);
          // 框架插件提示 失败
          this.$toast.fail(this.msg);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.hminput {
  width: 314 / 360vw * 100;
  height: 50px;
  outline: none;
  border: none;
  border-bottom: 2px solid #ccc;
  color: #888;
  font-size: 20px;
  line-height: 50px;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>