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

// 文章评论列表
export const getPostcomment = (id) => {
    return axios({
        url: '/post_comment/' + id
    })
}

// 发表评论
export const publishComment = (id, data) => {
    return axios({
        method: 'post',
        url: `/post_comment/${id}`,
        data
    })
}

// 搜索文章
export const searchPost = (keyWord) => {
    return axios({
        url: '/post_search?keyword=' + keyWord
    })
}
