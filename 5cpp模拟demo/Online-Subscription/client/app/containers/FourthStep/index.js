
/**
 *
 * FourthStep
 *
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectReducer from 'utils/injectReducer'
// import injectSaga from 'utils/injectSaga'
// import saga from './saga'
import reducer from './reducer'
import ControllerButton from '../../components/ControllerButton'
import CheckBox from './views/CheckBox'
import ShowItem from './views/ShowItem'

import style from './style.scss'
import { makeSelectFirstStepData } from '../FirstStep/selectors.js'
import { makeSelectFourthStep, makeSelectCheckState } from './selectors'
import { makeSelectSecondeStep } from '../PersonalInfo/selectors'
// import { makeSelectEmail, makeSelectPassword } from '../PersonalInfo/selectors.js'
// import { makeSelectPhone } from '../PhoneCode/selectors.js'
import { makeThirdStep } from '../Step3/selectors.js'
import { doSaveData, doSubmitData } from './actions'
import { doSetMessage } from '../App/actions'

class FourthStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DataReceivingBySms: props.SelectCheckState.DataReceivingBySms, // 通过短信
      DataReceivingByEMail: props.SelectCheckState.DataReceivingByEMail, // 通过电子邮件
      AgreeToTerms: props.SelectCheckState.AgreeToTerms, // 同意条款
      // s1data: props.s1data, // 第一步数据
      // s2data: {
      //   SelectEmail: props.SelectEmail,
      //   SelectPhone: props.SelectPhone,
      // },
      // s3data: {
      //   PaymentType: props.PaymentType,
      // },
      // password: props.SelectPassword
    }
  }

  changeSelFn(objKey) {
    this.setState({
      [objKey]: !this.state[objKey]
    })
  }

  handleSubmit = () => {
    if (!this.state.AgreeToTerms) {
      // alert('请接受以上陈述')
      this.props.dispatch(doSetMessage('请接受以上陈述', 'error'))
      return false
    }

    const { s1data, s2data, s3data } = this.props

    this.props.onSaveData({
      CheckState: {
        DataReceivingBySms: this.state.DataReceivingBySms,
        DataReceivingByEMail: this.state.DataReceivingByEMail,
        AgreeToTerms: this.state.AgreeToTerms,
      }
    })

    const birthday = s1data.month < 10 ?
      `${s1data.year}-0${s1data.month}-${s1data.day}` :
      `${s1data.year}-${s1data.month}-${s1data.day}`
    const dataObj = {
      name: s1data.username,
      password: s2data.password,
      email: s2data.mail,
      mobile: s2data.phone,
      birthday: birthday,
      province: s1data.province,
      city: 'string',
      distinct: 'string',
      paymentTunnel: s3data.paymentType,
      address: s1data.address
    }

    this.props.onSubmitData(dataObj)
  }

  render() {
    const { s1data, s2data, s3data } = this.props

    const PaymentTypeCode2Name = {
      ali: '支付宝',
      wx: '微信',
    }

    const showForm = [{
      id: 0,
      itemTitle: '个人信息',
      itemData: [{
        id: '01',
        detailItemTitle: '姓名',
        detailItemValue: s1data.username,
      }, {
        id: '02',
        detailItemTitle: '出生日期',
        detailItemValue: `${s1data.day}/${s1data.month}/${s1data.year}`,
      }]
    }, {
      id: 1,
      itemTitle: '地址信息',
      itemData: [{
        id: '11',
        detailItemTitle: '省市',
        detailItemValue: s1data.province,
      }, {
        id: '12',
        detailItemTitle: '详细地址',
        detailItemValue: s1data.address,
      }]
    }, {
      id: 2,
      itemTitle: '联系方式',
      itemData: [{
        id: '21',
        detailItemTitle: '电子邮件地址',
        detailItemValue: s2data.mail,
      }, {
        id: '22',
        detailItemTitle: '手机号码',
        detailItemValue: s2data.phone,
      }]
    }, {
      id: 3,
      itemTitle: '支付信息',
      itemData: [{
        id: '31',
        detailItemTitle: '支付类型',
        detailItemValue: PaymentTypeCode2Name[s3data.paymentType],
      }]
    }]

    return (
      <div className={style.showInfo}>
        <div className={style.capionText}>
          <div className={style.divStrong}><p><strong>请认真阅读以下内容，并确保您所填写信息的正确性。</strong></p></div>
          <div className={style.info}>
            <p>
              在您购买之前，您需要了解下方关于OwlDetect的摘要信息，完整条款内容请点击
              <a href="https://www.owldetect.com/uk/product-terms/" target="_blank" title="Product Terms">这里</a>。
              如您想进一步了解请联系我们0330 123096*或通过邮件
              <a href="mailto:enquiries@owldetect.com"><span>enquiries@owldetect.com</span></a>。
            </p>
          </div>
        </div>

        <div className={style.showForm}>
          {
            showForm.map((item) => {
              return (
                <ShowItem
                  key={item.id}
                  itemTitle={item.itemTitle}
                  itemData={item.itemData}
                  noTag={item.noTag}
                />
              )
            })
          }
        </div>

        <div className={style.showForm}>
          <ShowItem itemTitle="偏好设置" noTag />
          <div className={style.DataReceiving}>

            <CheckBox selState={this.state.DataReceivingBySms} changeSelFn={() => this.changeSelFn('DataReceivingBySms')} text="通过短信" />
            <CheckBox selState={this.state.DataReceivingByEMail} changeSelFn={() => this.changeSelFn('DataReceivingByEMail')} text="通过电子邮件" />

          </div>
          <ShowItem itemTitle="重要须知" noTag />

          <div className={style.DataReceiving}>
            <div className="text">
            在您点击“确认并购买”之后，我们将会给您的邮箱发送一封欢迎邮件，邮件中会注明您所订购的产品的生效日期。本产品按月收取费用，如您或我们取消订购，3.5英镑的订购费将会退还给您。
              我们每月将从您名下的支付账户中扣除月付费。如果OwlDetect的费用发生任何的变化，我们都会提前通知到您。
            </div>
          </div>

          <div className={style.DataReceiving}>
            <div className="text">
              在点击“确认并购买”之前，请确保您已阅读并同意以下内容：

              <ul className="ul">
                <li>我已阅读上方OwlDetect的重要须知</li>
                <li>我已阅读并接受OwlDetect的
                  <a href="#" target="_blank" title="产品条款">协议条款，隐私权政策，网站使用条款</a>
                  协议条款，隐私权政策，网站使用条款
                </li>
                <li>我要求CPP援助服务有限公司在OwlDetect协议条款中规定的14天冷静期结束前开始向我提供OwlDetect服务。
                  勾选下方“我接受以上声明”，我订购的产品将在我收到欢迎邮件时立即开始生效。
                </li>
              </ul>

            </div>
          </div>

          <CheckBox selState={this.state.AgreeToTerms} changeSelFn={() => this.changeSelFn('AgreeToTerms')} text="我接受以上陈述" />

        </div>

        <ControllerButton step="fourth" onHandleNext={this.handleSubmit} onHandlePreview={() => this.props.prev()} />

      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  s1data: makeSelectFirstStepData(),
  s2data: makeSelectSecondeStep(),
  s3data: makeThirdStep(),
  SelectCheckState: makeSelectCheckState(),
  orderCode: makeSelectFourthStep(),
})


const mapDispatchToProps = (dispatch) => ({
  onSaveData: (dataObj) => dispatch(doSaveData(dataObj)),
  onSubmitData: (dataObj) => dispatch(doSubmitData(dataObj)),
  dispatch
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'fourthStep', reducer })

// const withSaga = injectSaga({ key: 'fourthStep', saga })

export default compose(
  withReducer,
  withConnect,
  // withSaga
)(FourthStep)
