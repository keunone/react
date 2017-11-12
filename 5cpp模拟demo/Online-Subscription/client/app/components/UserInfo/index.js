/**
*
* UserInfo
*
*/

import React from 'react'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectUserInfo } from '../../containers/Login/selectors'

function UserInfo({ userInfo }) {
  return (
    <div className="col-6" style={{ color: '#f00' }}>
      <span>邮箱</span>
      <span>{userInfo.get('email')}</span>
    </div>
  )
}

const mapStateToProps = () => createStructuredSelector({
  userInfo: makeSelectUserInfo()
})

export default connect(mapStateToProps)(UserInfo)
