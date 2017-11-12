import { request } from 'utils'

interface LoginData {
  loginName: string
  password: string
}

export function login(data: LoginData) {
  return request.post('/auth/opuser/login', data)
}

export function logout() {
  return request.post('/auth/opuser/logout')
}

export function getUserList(data: any) {
  return request.get('/auth/opuser', {params: data})
}

export function createUser(payload: any) {
  console.log('servi-payload', payload)
  return request.post('/auth/opuser', {
    ...payload
  })
}

export function delectUser(id: number) {
  return request.delete('/auth/opuser/' + id)
}

export function editUserInfo(payload: any) {
  return request.put('/auth/opuser', payload)
}
