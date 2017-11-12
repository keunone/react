export default[
  {
    id : '1',
    icon : 'laptop',
    name : 'Dashboard',
    route : '/dashboard'
  }, {
    id : '2',
    name : '系统管理',
    children : [
      {
        id: '2-1',
        name: '用户管理',
        route: '/user',
        children: [
          {
            id: '2-1-1',
            name: '用户列表',
            permission: ['2'],
            route: '/user/list'
          }, {
            id: '2-1-2',
            name: '其他条目',
            route: '/user/other'
          }
        ]
      }, {
        id: '2-2',
        name: '订单管理',
        route: '/order',
        children: [
          {
            id: '2-2-1',
            name: '订单列表',
            route: '/order/list'
          }
        ]
      }
    ]
  }
]
