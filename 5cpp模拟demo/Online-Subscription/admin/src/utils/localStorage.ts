import config from 'config'
const prefix = config.prefix

export default {
  set(name: string, data: any) {
    window.localStorage.setItem(`${prefix}-${name}`, data)
  },
  get(name: string) {
    return window.localStorage.getItem(`${prefix}-${name}`)
  }
}
