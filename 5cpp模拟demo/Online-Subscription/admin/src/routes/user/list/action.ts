import queryString from 'query-string'

const actionGetUserList = (payload?: any) => {
  return {type: 'user/getUserList', payload}
}
const actionModelGetUserList = (payload?: any) => {
  return {type: 'getUserList', payload}
}
const actionSave = (payload: any) => {
  return {type: 'save', payload}
}
const actionSaveQuery = (payload: any) => {
  return {type: 'saveQuery', payload}
}
const actionSaveCurrent = (payload: number) => {
  return {type: 'user/saveCurrent', payload}
}
const doDelUser = (id) => ({
  type: 'user/delUser',
  payload: {
    id
  }
})

export {
  doDelUser,
  actionSave,
  actionSaveQuery,
  actionGetUserList,
  actionModelGetUserList,
  actionSaveCurrent
}
