// 这个文件主要是进行项目的路由模块的封装

// 1.工程化
import Vue from 'vue'
import VueRouter from 'vue-router'
// 安装路由功能
Vue.use(VueRouter)

import { Toast } from 'vant';

// 2.创建路由模块
const router = new VueRouter({
    routes: [
        // 路由重定向
        {
            path: '/',
            redirect: { name: 'index' }
        },
        // 配置路由
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/user/login.vue')
        }, {
            name: 'register',
            path: '/register',
            component: () => import('@/views/user/register.vue')
        }, {
            name: 'personal',
            path: '/personal/:id',
            component: () => import('@/views/user/personal.vue')
        }, {
            name: 'edit_profile',
            path: '/edit_profile/:id',
            component: () => import('@/views/user/edit_profile.vue')
        },
        {
            name: 'index',
            path: '/index',
            component: () => import('@/views/index.vue')
        },
        {
            name: 'articleDetail',
            path: '/articleDetail/:id',
            component: () => import('@/views/post/articleDetail.vue')
        },
        {
            name: 'myfollow',
            path: '/myfollow',
            component: () => import('@/views/user/myfollow.vue')
        },
        {
            name: 'mystar',
            path: '/mystar',
            component: () => import('@/views/user/mystar.vue')
        },
        {
            name: 'comment',
            path: '/comment/:id',
            component: () => import('@/views/comment.vue')
        },
        {
            name: 'cateManager',
            path: '/cateManager',
            component: () => import('@/views/cateManager.vue')
        },
        {
            name: 'search',
            path: '/search',
            component: () => import('@/views/search.vue')
        }
    ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
    let arr = ['personal']
    // console.log(to);
    // console.log(from);
    // if (to.path.indexOf('/personal/') !== -1) {
    if (arr.indexOf(to.name) !== -1) {
        let token = localStorage.getItem('heimatoutiao_token');
        if (token) {
            next()
        } else {
            // 提示
            Toast('未登陆,请先登陆!')
            // 跳转到登陆页面
            next({ name: "login", params: { url: from.name } })
        }
    } else {
        next()
    }
})

// 3.暴露
export default router