import React from 'react'
import classnames from 'classnames'
import './index.scss'

interface Props {
  type: string,
  className?: string
}

const Iconfont = ({ type, className }: Props): JSX.Element => {
  return (
    <svg className={classnames('colorful-icon', className)} aria-hidden="true">
      <use xlinkHref={`#${type.startsWith('#') ? type.replace(/#/, '') : type}`} />
    </svg>
  )
}

export default Iconfont
