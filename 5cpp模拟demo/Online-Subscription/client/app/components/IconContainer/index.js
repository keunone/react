/**
*
* IconContainer
*
*/
import React, { Component } from 'react'
import classnames from 'classnames'
import Iconfont from '../Iconfont/'
import styles from './style.scss'

export default class IconContainer extends Component {
  constructor(props) {
    super(props)
    this.disableValueCheck = this.props.disableValueCheck
    this.state = { show: false }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.disableValueCheck &&
      nextProps.children.props.value !== this.props.children.props.value) {
      this.setState({ show: true })
    }
  }

  render() {
    const { iconReset, type, inside, show, children } = this.props
    // console.log("props", type, inside, children)
    let iconName
    switch (type) {
      case 'success':
        iconName = 'icon-success_fill'
        break
      case 'warn':
        iconName = 'icon-delete_fill'
        break
      default:
        iconName = 'icon-success_fill'
        break
    }
    return (
      <div className={classnames(styles.iconContainer, { [styles.inside]: inside })}>
        {children}
        {(show || this.state.show) && <Iconfont className={classnames(styles.icon, styles.iconReset, `svg-${type}`)} type={iconName} />}
      </div>
    )
  }
}

IconContainer.propTypes = {

}

