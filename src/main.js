import Vue from 'vue'
import App from './App.vue'

// 引入全局的重置样式
import '@/styles/reset.less'

// 引入路由模块
import router from '@/router/index.js'

// 引入vant组件
import { Toast, Icon, Uploader, Dialog, Field, ActionSheet, Tab, Tabs, List, PullRefresh } from 'vant';

Vue.use(Toast).use(Icon).use(Uploader).use(Dialog).use(Field).use(ActionSheet).use(Tab).use(Tabs).use(List).use(PullRefresh)

Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App),
}).$mount('#app')
