import axios from 'axios'
import config from 'config'
import { cookie } from 'utils'

export const init = () => {
  axios.defaults.baseURL = config.apiUrl
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  axios.interceptors.request.use(req => {
    // Do something before request is sent
    const user = cookie.getJSON('user')
    req.headers.Authorization = 'Bearer ' + (user && user.token)

    return req
  }, error => {
    // Do something with request error
    throw (error)
    // return Promise.reject(error)
  })
  // Add a response interceptor
  axios.interceptors.response.use(res => {
    console.warn('response success', res.data)
    return res.data
  }, error => {
    console.warn('response error', JSON.stringify(error))

    // Do something with response error

    throw (error)
    // return Promise.reject(error.response && error.response.data)
  })
}

export default axios
