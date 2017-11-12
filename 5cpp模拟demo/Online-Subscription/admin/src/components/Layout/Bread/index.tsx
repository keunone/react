import React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'dva/router'
import { menuTool } from 'utils'

interface Props {
  menu: MenuItem[],
  locationData: LocationState
}

export default ({menu, locationData}: Props): JSX.Element => {
  console.log('Bread', menu, locationData)

  if (locationData && locationData.menuId) {

    const breadList = menuTool.getMenuItemsByMenuId(menu, locationData.menuId)
    return (
      <Breadcrumb>
        {
          breadList.map(bread => {
            return (
              <Breadcrumb.Item key={bread.id}>
                {
                  bread.route ?
                  (<Link
                    to={{
                      pathname: bread.route,
                      state: {menuId: bread.id}
                    }}
                  >{bread.name}
                  </Link>)
                  : bread.name
                }
              </Breadcrumb.Item>
            )
          })
        }
      </Breadcrumb>
    )
  }else {
    return (
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/">dashboard</Link></Breadcrumb.Item>
      </Breadcrumb>
    )
  }

}
