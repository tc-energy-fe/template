import http from './http'

export default {
  getToken: (data) => http({
    url: '/Token',
    method: 'post',
    data: data
  })
}
