import React from 'react'
import { Icon, Button } from 'antd'
import Menu from './Menu'

export default (props) => {
  return (
    <div>
      <Button type="primary" onClick={props.toggleCollapsed} style={{ marginBottom: 16 }}>
        <Icon type={props.collapsed ? 'menu-unfold' : 'menu-fold'} />
      </Button>
      <Menu menu={props.menu} />
    </div>
  )
}
