/**
*
* ControllerButton
*
*/

import React from 'react'
// import styled from 'styled-components'
// import { Link } from 'react-router-dom'
import styles from './styles.scss'

function ControllerButton({ step, onHandleNext, onHandlePreview }) {
  return (
    <div className={styles.controllerButton}>
      { step !== 'first' && step !== 'fifth' && <div className={styles.preButton} onClick = {onHandlePreview} >BACK</div>}
      { step !== 'fourth' && <div className={styles.nextButton} onClick = {onHandleNext}>NEXT</div>}
      { step === 'fourth' && <div className={styles.fourthButton} onClick = {onHandleNext}>CONFIRM AND BUY</div>}
    </div>
  )
}

export default ControllerButton
