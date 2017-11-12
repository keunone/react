export function getCommonDecorator(isRequired, initValue, type, onChange) {
  const decorator = {
    initialValue: '',
    rules: [],
    onChange,
    normalize(value) {
      return value.trim()
    }
  }
  if (isRequired) {
    decorator.rules.push({ required: true, message: 'the value is required' })
  }
  if (initValue) {
    decorator.initialValue = initValue
  }
  if (typeof type === 'function') {
    decorator.onChange = type
    switch (type) {
      case 'phone':
        decorator.rules.push({
          pattern: /^1[34578]$/,
          message: 'The input is not valid phone!'
        })
        break
      case 'email':
        decorator.rules.push({
          pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
          message: 'The input is not valid E-mail!'
        })
        break
      default:
        break
    }
  }
  return decorator
}
