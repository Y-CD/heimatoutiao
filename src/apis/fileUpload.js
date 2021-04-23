// 文件上传的api
import axios from '@/utils/request.js'

export const uploadFile = (data) => {
    return axios({
        method: 'post',
        url: '/upload',
        data
    })
}