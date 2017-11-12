import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Iconfont = ({ type, className }) => {
  return (
    <svg className={classnames('colorful-icon', className)} aria-hidden="true">
      <use xlinkHref={`#${type.startsWith('#') ? type.replace(/#/, '') : type}`} />
    </svg>
  )
}

Iconfont.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Iconfont
