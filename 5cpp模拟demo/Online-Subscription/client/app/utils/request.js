// import 'whatwg-fetch'
import { put, call } from 'redux-saga/effects'
import { REQUEST_URL, REQUEST_ACCEPT, REQUEST_CONTENT_TYPE } from './constants'
// import { myDispatch } from '../app'
import { doFetchData, doFetchError, doFetchSuccess } from '../containers/App/actions'

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null
  }
  return response.json()
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response)
    // error.response = response
    throw error
  }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

export default function* request(url, options) {
  const reqUrl = REQUEST_URL + url
  const myOptions = {
    headers: {
      Accept: REQUEST_ACCEPT,
      'Content-Type': REQUEST_CONTENT_TYPE,
      ...options.headers
    },
    ...options
  }
  try {
    yield put(doFetchData())
    const response = yield call(fetch, reqUrl, myOptions)
    // const data = yield checkStatus(response)
    const json = yield parseJSON(response)
    yield put(doFetchSuccess())
    return json
  } catch (error) {
    yield put(doFetchError(error))
    // throw error.message
  }
}

// export default function request(url, options) {
//   const reqUrl = REQUEST_URL + url
//   options = Object.assign(options, { headers: {
//     Accept: 'application/json, text/plain, */*',
//     'Content-Type': 'application/json'
//   }})
//   return fetch(reqUrl, options)
//     .then(checkStatus)
//     .then(parseJSON)
// }

// import axios from 'axios'
// import { put } from 'redux-saga/effects'
// import { REQUEST_URL } from './constants'
// import { doFetchData, doFetchError, doFetchSuccess } from '../containers/App/actions'

// export const init = () => {
//   axios.defaults.baseURL = REQUEST_URL
//   axios.defaults.timeout = 10000
//   axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//   axios.interceptors.request.use(req => {
//     put(doFetchData())
//     return req
//   }, error => {
//     put(doFetchError(error))
//     throw (error)
//   })
//   axios.interceptors.response.use(res => {
//     put(doFetchSuccess())
//     return res.data
//   }, error => {
//     put(doFetchError())
//     if (error.response.status === 401) {
//       // routerRedux.push('/login')
//     }
//     throw (error)
//   })
// }

// export default axios

