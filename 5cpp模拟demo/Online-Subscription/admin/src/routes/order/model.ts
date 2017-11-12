import { getOrderList } from 'services/order'

interface OrderListType {
  dataObj: {
    MaxResultCount: number,
    SkipCount: number
  }
}

export default {
  namespace: 'order',
  state: {
    orderListData: {
      totalCount: 10
    },
    currentPage: 1
  },
  effects: {
    * getOrderList({ dataObj }: OrderListType, { put, call }: any) {
      const orderData = yield call(getOrderList, dataObj)
      yield put({ type: 'getListSuccess', tableList: orderData.result })
    }
  },
  reducers: {
    getListSuccess(state: object, { tableList }: any) {
      return {
        ...state,
        orderListData: tableList
      }
    },
    setPage(state: object, { currentPage }: any) {
      return {
        ...state,
        currentPage: currentPage
      }
    }
  }
}
