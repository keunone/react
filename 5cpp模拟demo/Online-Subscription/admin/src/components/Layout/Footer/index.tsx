import React from 'react'
import config from 'config'
import styles from './index.scss'

export default (): JSX.Element => {
  return (<div className={styles.footer}>{config.footerText}</div>)
}
