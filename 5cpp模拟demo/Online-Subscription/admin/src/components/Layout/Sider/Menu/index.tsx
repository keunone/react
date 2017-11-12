import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { common } from 'utils'
import { Link } from 'react-router-dom'

interface MenuInf {
  id: string,
  children: any
}
interface Props {
  menu: MenuInf[]
}
interface State {
  openKeys: string[],
  collapsed: boolean
}

const { SubMenu } = Menu

class MenuItem extends Component<Props, State> {
  menu: MenuInf[]
  rootSubmenuKeys: string[]
  defaultSelectedKeys: string[]

  constructor(props: Props) {
    super(props)
    const { menu } = props
    // 获取含有子菜单的menu id
    this.rootSubmenuKeys = common.compact(menu.map(item => {
      if (item.children) {
        return item.id
      }
    }))
    this.menu = this.getMenus(menu)
    this.defaultSelectedKeys = [menu[0].id]
    this.state = {
      openKeys: [],
      collapsed: false
    }
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }

  getMenus = (menu) => {
    return menu.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
          >
            {this.getMenus(item.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.id}>
            <Link
              to={{
                pathname: item.route || '/',
                state: {menuId: item.id}
              }}
            >
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        )
      }
    })
  }

  render() {
    return (
      <div>
        <Menu
          defaultSelectedKeys={this.defaultSelectedKeys}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          {this.menu}
        </Menu>
      </div>
    )
  }
}

export default MenuItem
