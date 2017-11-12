import React from 'react'
import { Menu, Icon } from 'antd'
import { Iconfont } from 'components'
import styles from './index.scss'

interface Props {
  user: {
    name: string,
    token: string
  },
  logout: any
}

export default ({ user, logout }: Props): JSX.Element => {
  const { SubMenu } = Menu
  const handleClickMenu = e => e.key === 'logout' && logout(user.token)

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Iconfont type="logo" />
      </div>
      <div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={
              <span>
                <Icon type="user" />
                {user && user.name}
              </span>
            }
          >
            <Menu.Item key="logout">
              Sign out
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}
