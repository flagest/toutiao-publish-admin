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

/*
 * 获取频道接口
 */
export const getChannels = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels',
    params
  })
}
/*
 *删除接口
 */
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

/*
 * 发布文章请求接口
 */
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft // 是否存为草稿 （true为草稿）
    },
    data
  })
}
/*
 * 修改文章
 */
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}
/*
 * 获取指定文章
 */
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
