interface User {
  id: string
  name: string
  loginName: string
  groupId: string
  token: string
}

interface MenuItem {
  id: string
  name: string
  route?: string
  icon?: string
  permission?: string[]
  children?: MenuItem[]
}

interface LocationState {
  locationPathname: string,
  locationQuery: string,
  menuId: string | undefined
}
