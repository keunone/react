import React from 'react'
import cn from 'classnames'
import style from '../style.scss'

function CheckBox({ err, selState, text, changeSelFn }) {
  return (
    <div className={cn(style.myCheckbox, err && style.err)} onClick={changeSelFn}>
      <div className={cn(style.checkbox, selState && style.ok)} />
      <div className={cn(style.text)}>{text}</div>
    </div>
  )
}
export default CheckBox
