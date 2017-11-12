import React, { Component } from 'react'
import cn from 'classnames'
import style from '../style.scss'

class ShowItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetail: false,
    }
  }

  doShowDetail() {
    if (this.props.noTag) return // 如果不显示小三角时不执行事件
    this.setState({ showDetail: !this.state.showDetail }, () => {
      const oStyle = this.currentStyle ? this.currentStyle : window.getComputedStyle(this.refs.detailItem, null)
      let curH = 0
      if (oStyle.getPropertyValue) {
        curH = parseInt(oStyle.getPropertyValue('height'), 10) + parseInt(oStyle.getPropertyValue('margin-bottom'), 10)
      } else {
        curH = parseInt(oStyle.getPropertyValue('height'), 10) + parseInt(oStyle.getPropertyValue('marginBottom'), 10)
      }
      if (this.state.showDetail) {
        this.refs.showDetail.style.height = curH * this.props.itemData.length + 'px'
      } else {
        this.refs.showDetail.style.height = 0 + 'px'
      }
    })
  }

  render() {
    const { noTag, itemTitle, itemData = [] } = this.props
    return (
      <div className={style.item}>
        <div className={style.itemTitle} onClick={() => this.doShowDetail()}>
          <h6>{itemTitle}</h6>
        </div>
        <i className={cn(style.tagIco, { [`${style.noTag}`]: noTag }, this.state.showDetail ? style.tagIcoTop : style.tagIcoDown)} />
        <div className={cn(style.detail, { [`${style.show}`]: this.state.showDetail })} ref="showDetail">
          {
            itemData.map((item) => {
              return (
                <div key={item.id} className={style.detailItem} ref="detailItem">
                  <div className={style.detailItemTitle}>{item.detailItemTitle}</div>
                  <div className={style.detailItemValue}>{item.detailItemValue}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default ShowItem
