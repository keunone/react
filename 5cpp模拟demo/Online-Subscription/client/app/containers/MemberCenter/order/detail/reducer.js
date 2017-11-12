
import { FETCH_SUCCESS } from './constants'
import { fromJS } from 'immutable'

const initState = fromJS({
  id: '',
  name: '',
  userId: '',
  productId: '',
  paymentTunnel: '',
  status: 0,
  effectiveDate: '',
  terminationDate: '',
  creationTime: '',
  orderNo: null
})

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { name,
        userId,
        productId,
        paymentTunnel,
        status,
        effectiveDate,
        terminationDate,
        creationTime,
        orderNo } = action.item
      return state
        .set('name', name)
        .set('userId', userId)
        .set('productId', productId)
        .set('paymentTunnel', paymentTunnel)
        .set('status', status)
        .set('effectiveDate', effectiveDate)
        .set('terminationDate', terminationDate)
        .set('creationTime', creationTime)
        .set('orderNo', orderNo)
    default:
      return state
  }
}

export default reducer
