/*
*文章请求列表接口
*/
import request from '@/utils/request'

/*
 * 获取文章列表
 */
export const getArticles = params => {
  return request({
     method: 'GET',
     url: '/mp/v1_0/articles',
     // Body参数使用 data设置，形参相同的可以直接写data
     // Query参数使用 params设置,形参相同的可以直接写params
     // headers 参数使用headers
     params
   })
}
