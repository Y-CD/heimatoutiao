import Vue from 'vue'
import App from './App.vue'

// 引入全局的重置样式
import '@/styles/reset.less'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
