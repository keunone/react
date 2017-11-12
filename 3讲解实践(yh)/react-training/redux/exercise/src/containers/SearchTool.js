import React from 'react'
import { Input } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ShowText from '../components/ShowText'
import { doSearchBook } from '../actions'

const Search = Input.Search;

const SearchTool = ({ keyword, dispatch }) => (
    <div style = {{height: '50px'}}>
        <Search
            placeholder="书名/作者"
            style={{ width: 200, height: 30, margin: '10px 20px' }}
            onSearch={value => dispatch(doSearchBook(value))}
        />
        <ShowText keyword = { keyword } />
    </div>
)

SearchTool.prototype = {
    keyword: PropTypes.string,
}

const mapStateToProps = state => ({
    keyword: state.keyword
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchTool)
