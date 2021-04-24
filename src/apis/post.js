// 这个文件专门用来添加与文章的api方法

// 引入封装好的axios
import axios from '@/utils/request.js'

export const getPostlist = (params) => {
    return axios({
        url: `/post`,
        params
    })
}