import { request } from 'utils'

export function getOrderList(data: any) {
  return request.get('/core/subscriptions', {params: data})
}
