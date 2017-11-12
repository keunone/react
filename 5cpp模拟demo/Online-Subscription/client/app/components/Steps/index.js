/**
*
* Steps
*
*/

import React from 'react'
import classNames from 'classnames'
// import styled from 'styled-components'
import style from './style.scss'

function Steps({ stepObj }) {
  // stepObj即是模拟从父组件传过来的props属性(let stepObj = props)
  return (
    <div className={style.stepWrap}>
      <div className={style.pc}>
        <ul>
          {
            stepObj.map((step) => {
              const stepStateClass = classNames({
                [style.active]: step.state === 'active',
                [style.done]: step.state === 'done'
              })
              return (
                <li className={stepStateClass} key={step.id}>
                  <p className={style.circle}>
                    {step.state !== 'done' ? <span className={style.text}>{step.id + 1}</span> : <a href="/">{}</a>}
                  </p>
                  <p className={style.tips}>{step.tip}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className={style.phone}>
        <ul>
          {
            stepObj.map(step => {
              if (step.state === 'active') {
                return (
                  <li className={style.active} key={step.id}>
                    <p className={style.circle}>
                      {step.state !== 'done' ? <span className={style.text}>{step.id + 1}</span> : <a href="/">{}</a>}
                    </p>
                    <p className={style.tips}>{step.tip}</p>
                  </li>
                  )
              } else {
                return ''
              }
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Steps
