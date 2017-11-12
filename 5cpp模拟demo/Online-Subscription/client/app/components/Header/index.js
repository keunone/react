/**
*
* Header
*
*/

import React from 'react'
import style from './style.scss'
import Login from '../../containers/Login'
import LanguageSelect from '../../containers/LanguageSelect'

function Header() {
  return (
    <div className={style.header}>
      <div className="container-fluid">
        <div className={`row ${style.headerBar}`}>
          <div className="col-lg-3"></div>
          <div className="col-lg-9">
            <Login />
            <LanguageSelect />
          </div>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
}

export default Header
