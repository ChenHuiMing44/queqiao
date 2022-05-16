/**
 * @2019-07-22
 * @author: hm
 * desc: 请求接口，我还是觉得 ajax 好听一点
 */
import axios from 'axios'

/**
 * @author: hm, 3/25/21
 * des: 获取接口验签
 */

const baseRequest = params =>
  new Promise((resolve, reject) => {
    const timeout = params.timeout || 8 * 1000
    const queryParams = {
      url: params.url,
      method: params.method || 'GET',
      headers: {
        'Content-type': params.contentType || 'application/json',
        ...params.extraHeader
      }
    }
    params.isBody ? (queryParams.data = params.data) : (queryParams.params = params.data)
    queryParams.baseURL = params.ext ? params.ext : '/api'
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('timeout')
      }, timeout)
    })
    Promise.race([
      axios(queryParams),
      timeoutPromise
    ])
      .then(res => {
        if ([0, 200].includes(+res.data.code)) {
          !res.data && (res.data = {})
          resolve(res.data.data)
        } else {
          reject({
            errMsg: res.data.message || res.data.msg || '呀，系统开了点小差',
            errCode: res.data.code,
            errData: res.data.data,
            err: res
          })
        }
      })
      .catch(err => {
        const errMsg = err === 'timeout' ? '请求超时' : '呀，系统开了点小差'
        reject({ err, errMsg })
      })
  })

export const zuulRequest = (url, method, params, isBody) => {
  return baseRequest({
    url,
    method,
    data: params,
    isBody,
    ext: '/api',
    extraHeader: { source: 'BANK' }
  })
}

/**
 * @author: hm, 4/16/21
 * des: 建议所有接口调取下面两个
 */
export const zuulGet = (url, params) => {
  return zuulRequest(url, 'GET', params)
}

export const zuulPost = (url, params, isBody = true) => {
  return zuulRequest(url, 'POST', params, isBody)
}

export default {
  baseRequest,
  post: zuulPost,
  get: zuulGet
}
