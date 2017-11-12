/**
 *
 * Step3
 *
 */

import { createForm } from 'rc-form'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import injectReducer from 'utils/injectReducer'
import { createStructuredSelector } from 'reselect'
import { getCommonDecorator } from '../../utils/formDecorator'
import IconContainer from '../../components/IconContainer'
import style from './style.scss'
import ControllerButton from '../../components/ControllerButton'
import reducer from './reducer'
import { doSaveData } from './actions'

import { makePaymentType } from './selectors.js' // 支付方式

class Form extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (error) {
        this.setState({ show: true })
        return false
      } else {
        this.props.onSaveData(value)
        this.props.next()
      }
    })
  }

  render() {
    const { getFieldError, getFieldDecorator } = this.props.form
    const fields = [
      {
        name: 'PaymentType',
        decorator: getCommonDecorator(true, this.props.PaymentType),
        dom: () => (
          <select className="form-control" name="" id="">
            <option value="" disabled>请选择支付方式</option>
            <option value="ali">支付宝</option>
            <option value="wx">微信</option>
          </select>
        )
      },
    ]

    return (
      <div className={style.selectMode}>
        <div>
          <p className={style.textInfo}>您将为此支付3.5英镑每月，费用从您下方填写的支付账户中扣款，直到您或者我们取消产品订购。</p>
        </div>
        <form>
          {
            fields.map(item => {
              const key = item.name
              return (
                <IconContainer show={this.state.show} key={key} type={getFieldError(key) ? 'warn' : 'success'}>
                  {getFieldDecorator(key, item.decorator)(item.dom(key))}
                </IconContainer>
              )
            })
          }
          <ControllerButton step="third" onHandleNext={this.submit} onHandlePreview={() => this.props.prev()} />
        </form>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     ...state
//   }
// }


const mapStateToProps = createStructuredSelector({
  PaymentType: makePaymentType(),
})


const mapDispatchToProps = (dispatch) => ({
  onSaveData: (dataObj) => {
    dispatch(doSaveData(dataObj))
  },
  dispatch
})


const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'step3data', reducer })

const wrappedThirdStep = createForm()(Form)

export default compose(
  withReducer,
  withConnect,
)(wrappedThirdStep)
