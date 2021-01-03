/**
 *
 *基于axios封装请求模块
 */
import axios from 'axios'

// 创建一个axios实例，说白了就是复制一个oxious
// 我们通过一个实例发请求，把需要的配置配个这个实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/' // 请求的基础路径
})

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default request
