export default {
  getMenuById(menu: MenuItem[], id: string): MenuItem {
    // console.log('getMenuById', menuList, id)
    return menu.find(item => item.id === id)
  },

  getMenuItemByRoute(menu: MenuItem[], route: string) {
    let children: MenuItem[] = []
    const data: MenuItem = menu.find(item => {
      item.children && (children = children.concat(item.children))
      return item.route === route
    })
    if (!data && children.length > 0) {
      return this.getMenuItemByRoute(children, route)
    }else {
      return data
    }
  },

  getMenuItemsByMenuId(menu: MenuItem[], menuId: string) {
    if (!menuId) {
      return
    }
    const menuIdList = menuId.split('-')
    // console.log('menuIdList', menuIdList)
    let menuList = menu
    const menuItems = []
    // 逐级查找menu
    menuIdList.reduce((pre, cur) => {
      const mid = pre ? pre + '-' + cur : cur
      const data: MenuItem = this.getMenuById(menuList, mid)
      menuItems.push(data)
      if (data.children) {
        menuList = data.children
      }
      return mid
    }, undefined)
    return menuItems
  }
}
