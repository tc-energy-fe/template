import axios from 'axios'
import url from './apiUrl'

const CancelToken = axios.CancelToken
const baseUrl = url

const axiosIns = axios.create({
  baseURL: baseUrl
  // timeout: 5000
})
axiosIns.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axiosIns.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'
// axiosIns.defaults.headers['Authorization'] = sessionStorage.getItem('Token')

// request拦截器
axiosIns.interceptors.request.use(function (config) {
  const Token = sessionStorage.getItem('Token')
  const headers = config.headers

  if (Token) {
    headers.Authorization = `CAuth ${Token}`
  }
  return config
}, function (error) {
  console.error('Request error', error)
  return Promise.reject(error)
})

// response拦截器
axiosIns.interceptors.response.use(function (response) {
  const status = response.status
  const state = response.data.State
  // 判断返回值状态
  if (status === 200 && (state || state === 0)) {
    if (state >= 0) {
      return response.data
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        code: state,
        msg: response.data.Msg,
        desc: response.data.Desc
      })
    }
  } else {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      code: state,
      msg: response.data.Msg,
      desc: response.data.Desc
    })
  }
}, function (error) {
  // 请求主动cancel
  if (axios.isCancel(error)) {
    console.error('Response canceled', error)
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      code: 'cancel',
      abort: true
    })
  } else {
    // 处理错误
    console.error('Response error', error)
    const response = error.response
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      code: response.data.State,
      msg: response.data.Msg,
      desc: response.data.Desc
    })
  }
})

const http = (data) => {
  let cancel = null
  const config = Object.assign({
    // 请求的中止函数
    cancelToken: new CancelToken(c => {
      cancel = c
    }),

    // 为上传处理进度事件
    onUploadProgress: function (progressEvent) {
      // Do whatever you want with the native progress event
    },

    // 为下载处理进度事件
    onDownloadProgress: function (progressEvent) {
      // 对原生进度事件的处理
    },

    // params序列化函数
    paramsSerializer: function (params) {
      let str = ''
      Object.entries(params).forEach((item, index, arr) => {
        str += `${encodeURIComponent(item[0])}=${encodeURIComponent(item[1])}${index === arr.length - 1 ? '' : '&'}`
      })
      return str
    }
  }, data)

  return {
    request: axiosIns.request(config),
    cancel: cancel
  }
}

export default http
