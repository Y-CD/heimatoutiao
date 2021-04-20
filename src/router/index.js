// 这个文件主要是进行项目的路由模块的封装

// 1.工程化
import Vue from 'vue'
import VueRouter from 'vue-router'
// 安装路由功能
Vue.use(VueRouter)

// 2.创建路由模块
const router = new VueRouter({
    routes: [
        // 配置路由
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/user/login.vue')
        }
    ]
})

// 3.暴露
export default router