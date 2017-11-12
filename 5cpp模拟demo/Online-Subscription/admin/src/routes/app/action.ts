import queryString from 'query-string'

const doLogout = () => {
  return {
    type: 'app/logout'
  }
}

const doUpdateState = (location, menuId) => {
  return {
    type: 'updateState',
    payload: {
      locationPathname: location.pathname,
      locationQuery: queryString.parse(location.search),
      menuId
    },
  }
}

const doClearState = () => {
  return {
    type: 'updateUser',
    payload: {}
  }
}

export { doLogout, doUpdateState, doClearState }
