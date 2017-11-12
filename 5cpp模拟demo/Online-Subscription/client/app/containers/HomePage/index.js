import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import style from './style.scss'
import messages from './message'

const HomePage = () => (
  <div>
    <div className={style.video} />
    <Link to="/step/first" className={style.footerButton} >
      <FormattedMessage {...messages.buyNow} />
    </Link>
  </div>
)

export default HomePage
