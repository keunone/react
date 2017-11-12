export function compact(arg = {}) {
  let result
  if (typeof arg === 'object') {
    result = {}
    for (const name in arg) {
      if (arg[name]) {
        result[name] = arg[name]
      }
    }
  }
  return result
}

export function getValidValueLength(arg = {}) {
  const data = compact(arg)
  if (typeof data === 'object') {
    return Object.keys(data).length
  }
}
