/**
 *
 *基于axios封装请求模块
 */
import axios from 'axios'
import JsonBigInt from 'json-bigint'
// 创建一个axios实例，说白了就是复制一个oxious
// 我们通过一个实例发请求，把需要的配置配个这个实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/', // 请求的基础路径
  // 定制后端返回原始数据
  // 参数data就是后端返回原始数据，(未经处理的JSON格式字符串)
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data
    // axios默认是使用JOSN.parse来转换原始数据
    // return JSON.parse(data)
    try {
      return JsonBigInt.parse(data)
    } catch (e) {
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  // 任何请求都会经过这里
  function (config) {
    console.log('我来了姐姐')
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // config当前请求相关配置对象
    return config
  },
  // 请求失败会经过这里
  function (error) {
     return Promise.reject(error)
  }
)

// 响应拦截器

// 导出请求方法
export default request
