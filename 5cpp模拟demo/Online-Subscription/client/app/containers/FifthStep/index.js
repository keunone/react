/**
 *
 * FifthStep
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectReducer from 'utils/injectReducer'
import { push } from 'react-router-redux'
import reducer from './reducer'
import { makeSelectFourthStep } from '../FourthStep/selectors'
import ControllerButton from '../../components/ControllerButton'
import style from './style.scss'


function FifthStep({ orderCode, prev, next }) {
  const handleSubmit = () => {
    next()
    // dispatch(push('/'))
  }
  return (
    <div style={{ width: '100%' }}>
      <div className={style.fifthContainer}>
        <p className={style.title}>订单确认</p>
        <p className={style.detail}>感谢您购买OwlDetect，我们已经将您的合同发送到了您的电子邮箱，
          请注意查收。若您在24小时内未收到邮件，请联系我们并告知下方展示的订单号。以防万一，请记录并保存您的订单号
        </p>
        <p className={style.orderCode}>{orderCode}</p>
      </div>
      <ControllerButton step="fifth" onHandleNext={handleSubmit} onHandlePreview={() => prev()} />
    </div>
  )
}


const mapStateToProps = createStructuredSelector({
  orderCode: makeSelectFourthStep()
})
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'fifthstep', reducer })

export default compose(
  withReducer,
  withConnect,
)(FifthStep)
