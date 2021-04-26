// 这个文件专门用来添加与用户相关的api方法

// 引入封装好的axios
import axios from '@/utils/request.js'

// 用户登陆
export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}
// 注册
export const userRegister = (data) => {
    return axios({
        method: 'post',
        url: '/register',
        data
    })
}
// 获取用户信息
export const getUserInfo = (id) => {
    return axios({
        url: `/user/${id}`,
        // 设置请求头带token
        // headers: { Authorization: localStorage.getItem('heimatoutiao_token') }
    })
}
// 更新用户信息
export const updateUserInfo = (id, data) => {
    return axios({
        method: 'post',
        url: `/user_update/${id}`,
        data
    })
}

// 关注用户
export const followUser = (id) => {
    return axios({
        url: '/user_follows/' + id
    })
}

// 取消关注用户
export const unfollowUser = (id) => {
    return axios({
        url: '/user_unfollow/' + id
    })
}

// 用户关注列表
export const getUserFollow = () => {
    return axios({
        url: '/user_follows'
    })
}

// 收藏文章列表
export const getUserStar = () => {
    return axios({
        url: '/user_star'
    })
}