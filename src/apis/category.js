// 这个文件专门用来添加与栏目的api方法

// 引入封装好的axios
import axios from '@/utils/request.js'

export const getCateList = () => {
    return axios({
        url: '/category'
    })
}