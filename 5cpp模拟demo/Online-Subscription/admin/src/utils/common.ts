export default {
  compact(arg: any) {
    let result
    if (arg.constructor === Object) {
      result = {}
      for (const name in arg) {
        if (arg[name]) {
          result[name] = arg[name]
        }
      }
    }else if (arg.constructor === Array) {
      result = []
      arg.forEach(element => {
        element && result.push(element)
      })
    }
    return result
  },

  getValidValueLength(arg: object = {}) {
    const data = this.compact(arg)
    if (typeof data === 'object') {
      return Object.keys(data).length
    }
  }

}
