/**
 *
 * FirstStep
 *
 */
import React from 'react'
import { createForm } from 'rc-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import classnames from 'classnames'
import injectReducer from 'utils/injectReducer'
import { getValidValueLength } from 'utils/common'
import { doSaveData } from './actions'
import { getCommonDecorator } from '../../utils/formDecorator'
import ControllerButton from '../../components/ControllerButton'
import IconContainer from '../../components/IconContainer'
import { makeSelectFirstStepData } from './selectors'
import reducer from './reducer'
import { doSetMessage} from '../App/actions'
import style from './style.scss'


class FirstStep extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      // firstStepDate: {},
      iconShow: false,
      selectIconShow: false,  // select的icon是否显示
      notAllSelectFlag: true, // select选项是否全选  true不全选
      dateIsError: false      // 所选日期是否错误    true错误
    }
  }
  submit = (e) => {
    e.preventDefault()
    this.setState({ iconShow: true, selectIconShow: true })

    let dataObj = null
    this.props.form.validateFields((error, value) => {
      dataObj = value
      console.log(error, value)
    })

    // 表单验证
    if (dataObj.username.trim() === '') {
      return ''
    }
    if (dataObj.year.trim() === '') {
      return ''
    }
    if (dataObj.month.trim() === '') {
      return ''
    }
    if (dataObj.day.trim() === '') {
      return ''
    }
    const birthday = dataObj.month < 10 ?
      `${dataObj.year}-0${dataObj.month}-${dataObj.day}` :
      `${dataObj.year}-${dataObj.month}-${dataObj.day}`

    if (!(parseInt(new Date(birthday).getMonth() + 1, 10) === parseInt(dataObj.month, 10) &&
      parseInt(new Date(birthday).getDate(), 10) === parseInt(dataObj.day, 10))) {
      this.setState({ dateIsError: true })
      return ''
    }

    if (dataObj.province.trim() === '') {
      return ''
    }
    if (dataObj.address.trim() === '') {
      return ''
    }
    // this.props.dispatch(push('/personalInfo'))
    this.props.onSaveData(dataObj)
    this.props.next()
  }

  render() {
    const { getFieldError, getFieldsError, isFieldTouched, getFieldDecorator } = this.props.form
    const formField = this.props.firstStepData
    const notAllSelectFunc = () => {
      setTimeout(() => {
        const fieldsList = ['year', 'month', 'day']
        const isFieldsTouched = fieldsList.every(name => {
          return isFieldTouched(name)
        })
        // 获取三个选框的值判断是否全选
        this.setState({ notAllSelectFlag: !isFieldsTouched || getValidValueLength(getFieldsError(['year', 'month', 'day'])) > 0 })
      })
    }
    const getArray = (m, n) => {
      const arr = []
      for (let i = m; i <= n; i += 1) {
        arr.push(i)
      }
      return arr
    }
    const years = getArray(1900, 1999)
    const months = [
      { key: '1月', value: 1 },
      { key: '2月', value: 2 },
      { key: '3月', value: 3 },
      { key: '4月', value: 4 },
      { key: '5月', value: 5 },
      { key: '6月', value: 6 },
      { key: '7月', value: 7 },
      { key: '8月', value: 8 },
      { key: '9月', value: 9 },
      { key: '10月', value: 10 },
      { key: '11月', value: 11 },
      { key: '12月', value: 12 }
    ]
    const days = getArray(1, 31)
    return (
      <div className={style.firstStepWrap}>
        <form>
          <IconContainer key="sex" type={getFieldError('sex') ? 'warn' : 'success'}>
            {
              getFieldDecorator('sex', getCommonDecorator(false, formField.sex))(
                <select className={classnames(style.sexSelect, 'form-control')}>
                  <option value="先生">先生</option>
                  <option value="女士">女士</option>
                </select>
              )
            }
          </IconContainer>
          <IconContainer show={this.state.iconShow} key="username" type={getFieldError('username') ? 'warn' : 'success'}>
            {getFieldDecorator('username', getCommonDecorator(true, formField.username))(<input className="form-control" placeholder="请输入姓名*" />)}
          </IconContainer>

          <div className={style.brithdayTitle}>生日</div>
          {/* <div className={style.selectWrap}> */}

          <IconContainer
            disableValueCheck
            iconReset="iconReset"
            show={this.state.selectIconShow}
            key="day"
            type={(
              this.state.notAllSelectFlag ||
              this.state.dateIsError) ? 'warn' : 'success'}>
            <div className={`row ${style.selectWrap}`} >
              <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12" style={{margin: 0, padding: 0 }}>
                {getFieldDecorator('year', getCommonDecorator(true, formField.year, () => {
                  notAllSelectFunc()
                  this.setState({dateIsError: false })
                  this.setState({selectIconShow: true })
                }))(
                  <select name="year" className="form-control">
                    <option disabled value="">年*</option>
                    {
                      years.map((year) => (
                        <option value={year} key={year}>{year}</option>
                      ))
                    }
                    <option value="1999">1999</option>
                  </select>)
                }
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12" style={{ margin: 0, padding: 0 }}>
                {getFieldDecorator('month', getCommonDecorator(true, formField.month, () => {
                  notAllSelectFunc()
                  this.setState({dateIsError: false })
                  this.setState({selectIconShow: true })
                }))(
                  <select name="month" className="form-control">
                    <option disabled value="">月*</option>
                    {
                      months.map((month) => (
                        <option value={month.value} key={month.value}>{month.key}</option>
                      ))
                    }
                  </select>)}
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12" style={{margin: 0, padding: 0 }}>
                {
                  getFieldDecorator('day', getCommonDecorator(true, formField.day, () => {
                    notAllSelectFunc()
                    this.setState({dateIsError: false })
                    this.setState({selectIconShow: true })
                  }))(
                    <select className="form-control">
                      <option disabled value="">日*</option>
                      {
                        days.map((day) => (
                          <option value={day} key={day}>{day}</option>
                        ))
                      }
                    </select>
                  )
                }
              </div>
            </div>
          </IconContainer>

          {/* </div> */}
          <IconContainer show={this.state.iconShow} key="province" type={getFieldError('province') ? 'warn' : 'success'}>
            {getFieldDecorator('province', getCommonDecorator(true, formField.province))(<input className="form-control" placeholder="请输入省市*" />)}
          </IconContainer>
          <IconContainer show={this.state.iconShow} key="address" type={getFieldError('address') ? 'warn' : 'success'}>
            {getFieldDecorator('address', getCommonDecorator(true, formField.address))(<input className="form-control" placeholder="请输入详细地址*" />)}
          </IconContainer>
          <ControllerButton step="first" onHandleNext={this.submit} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  // sex: makeSelectSex(),
  // username: makeSelectUsername(),
  // year: makeSelectYear(),
  // month: makeSelectMonth(),
  // day: makeSelectDay(),
  // province: makeSelectProvince(),
  // address: makeSelectAddress()
  firstStepData: makeSelectFirstStepData()
})

const mapDispatchToProps = (dispatch) => ({
  onSaveData: (dataObj) => dispatch(doSaveData(dataObj)),
  dispatch
})


const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'firstStep', reducer })

const wrappedFirstStep = createForm()(FirstStep)

export default compose(
  withReducer,
  withConnect,
)(wrappedFirstStep)

