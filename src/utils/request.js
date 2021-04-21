// 1.引入axios
import axios from 'axios'

// 2.配置axios 添加默认配置
axios.defaults.baseURL = 'http://157.122.54.189:9083'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log(config);
    // 在发送请求之前做些什么
    // 添加 Authorization: localStorage.getItem('heimatoutiao_token')
    let token = localStorage.getItem('heimatoutiao_token');
    if (token) {
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 3.暴露
export default axios