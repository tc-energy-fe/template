import axios from 'axios'
import url from './apiUrl'
import ERROR_CODE from '@/api/error-code'
// import router from '@/router'

const CancelToken = axios.CancelToken
const baseUrl = url

const axiosIns = axios.create({
  baseURL: baseUrl
  // timeout: 5000,
})
axiosIns.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axiosIns.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'
// axiosIns.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

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
axiosIns.interceptors.response.use(
  function (response) {
    const status = response.status
    const state = response.data.State
    // 判断返回值状态
    if (status === 200 && (state || state === 0)) {
      if (state >= 0) {
        return response.data
      } else {
        return Promise.reject({
          code: state,
          msg: response.data.Msg,
          desc: response.data.Desc
        })
      }
    } else {
      return Promise.reject({
        code: state,
        msg: response.data.Msg,
        desc: response.data.Desc
      })
    }
  },
  function (error) {
    // 请求主动cancel
    if (axios.isCancel(error)) {
      console.error('Response canceled', error)
      return Promise.reject({
        code: 'cancel',
        abort: true
      })
    } else {
      // 处理错误
      console.error('Response error', error)
      const response = error.response
      return Promise.reject({
        code: response.data.State,
        msg: response.data.Msg,
        desc: response.data.Desc
      })
    }
  }
)

class Http {
  ERROR_CODE = ERROR_CODE;
  axiosIns = axiosIns;

  constructor (config) {
    let cancel = null

    this.config = Object.assign({
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
    }, config)
    this.request = this.axiosIns.request(this.config)
    this.cancel = cancel
  }

  static errorHandle (err) {
    console.log(err)
    if (err.code === -2) {
      ElAlert('未登录或者登录信息过期！', '提示').then(() => {
        location.replace(location.origin + '/login')
      })
    } else if (err.code === -15) {
      ElAlert('账号异地登录！', '错误').then(() => {
        location.replace(location.origin + '/login')
      })
    } else if (!err.hasOwnProperty('code')) {
      ElAlert('数据错误或网络异常！', '错误').then(() => {})
    } else if (!err.abort) {
      const code = err.code.toString()
      const errorMsg = err.msg || err.desc || ERROR_CODE.default[code] || `未知错误${code}`
      ElAlert(errorMsg, '错误').then(() => {})
    }
  }

  static successHandle (code, msg) {
    if (code === 200) {
      ElAlert(msg || '执行成功!', '提示').then(() => {})
    }
  }
}

export default Http
