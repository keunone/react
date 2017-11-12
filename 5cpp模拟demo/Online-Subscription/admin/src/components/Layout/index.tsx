import React, { Component } from 'react'
import { Layout } from 'antd'
import Header from './Header'
import Footer from './Footer'
import Bread from './Bread'
import SiderContent from './Sider'
import styles from './index.scss'

interface Props {
  user: User
  logout: any
  menu: MenuItem[]
  locationData: LocationState
}
interface State {
  collapsed: boolean
}

const { Sider, Content } = Layout

export default class LayoutItem extends Component<Props, State> {
  headerProp: { user: User, logout: any }
  siderProp: { menu: MenuItem[], collapsed: boolean, toggleCollapsed: any }
  breadProp: { menu: MenuItem[], locationData: LocationState }

  constructor(props: Props) {
    super(props)
    this.state = {
      collapsed: false,
    }
    this.handelProp(props)
  }

  componentWillReceiveProps(newProp: Props) {
    console.log('set prop')
    this.handelProp(newProp)
  }

  handelProp = (props: Props) => {
    const { user, logout, menu, locationData } = props
    this.headerProp = { user, logout }
    this.siderProp = {
      menu,
      collapsed: this.state.collapsed,
      toggleCollapsed: this.toggleCollapsed
    }
    this.breadProp = { menu, locationData }
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render() {
    return (
      <Layout className={styles.layout}>
        <Header {...this.headerProp} />
        <Layout>
          <Sider
            collapsible
            trigger={null}
            collapsed={this.state.collapsed}
          >
            <SiderContent {...this.siderProp} />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <div className={styles.bread}>
              <Bread {...this.breadProp}/>
            </div>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
        <Footer />
      </Layout>
    )
  }
}
