import config from 'config'
import * as Cookies from 'js-cookie'

const prefix = config.prefix

export default {
  set(name: string, value: any, expire: number = 30) {
    Cookies.set(`${prefix}-${name}`, value, { expires: expire })
  },
  get(name: string) {
    return Cookies.get(`${prefix}-${name}`)
  },
  getJSON(name: string) {
    return Cookies.getJSON(`${prefix}-${name}`)
  },
  remove(name: string) {
    return Cookies.remove(`${prefix}-${name}`)
  }
}
