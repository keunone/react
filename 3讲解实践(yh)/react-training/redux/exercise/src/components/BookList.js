import React from 'react'
import Book from './Book'
import { Spin } from 'antd';

const BookList = ({ books, isLoading }) => (
  <div>
    <div style = {isLoading ? {"display": "block"} : {"display": "none"}}>
      <Spin />
    </div>
    <div>
      {books.map(book =>
        <Book
          key={book.id}
          {...book}
        />
      )}
    </div>
  </div>
)

export default BookList
