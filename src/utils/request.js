// 1.引入axios
import axios from 'axios'

// 2.配置axios 添加默认配置
axios.defaults.baseURL = 'http://157.122.54.189:9083'

// 3.暴露
export default axios