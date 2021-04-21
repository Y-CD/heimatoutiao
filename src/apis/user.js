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

export const userRegister = (data) => {
    return axios({
        method: 'post',
        url: '/register',
        data
    })
}

export const getUserInfo = (id) => {
    return axios({
        url: `/user/${id}`,
        // 设置请求头带token
        // headers: { Authorization: localStorage.getItem('heimatoutiao_token') }
    })
}