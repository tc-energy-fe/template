let apiUrl = ''

if (process.env.VUE_APP_API_MODE === 'production') {
  apiUrl = 'http://pro.api.eshangneng.com:8000/api'
} else {
  apiUrl = 'http://dev.api.eshangneng.com:8000/api'
}

export default apiUrl
