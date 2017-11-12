import { connect } from 'react-redux'
import BookList from '../components/BookList'

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  books: state.books
})

const ViewBookList = connect(
  mapStateToProps
)(BookList)

export default ViewBookList