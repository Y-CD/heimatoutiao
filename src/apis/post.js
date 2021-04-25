// 这个文件专门用来添加与文章的api方法

// 引入封装好的axios
import axios from '@/utils/request.js'

export const getPostlist = (params) => {
    return axios({
        url: `/post`,
        params
    })
}

// 获取指定id文章的详情数据
export const getPostDetail = (id) => {
    return axios({
        url: '/post/' + id
    })
}

// 点赞文章
export const likePost = (id) => {
    return axios({
        url: '/post_like/' + id
    })
}

// 收藏文章
export const listStar = (id) => {
    return axios({
        url: '/post_star/' + id
    })
}