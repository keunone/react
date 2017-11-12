import React from 'react'
import PropTypes from 'prop-types'

const ShowText = ({ keyword }) => (
    <div style= {{marginLeft: '20px'}}>
        <span>您要找到的是不是：{keyword}</span>
    </div>
)

ShowText.prototype = {
    keyword: PropTypes.string.isRequired,
}

export default ShowText;