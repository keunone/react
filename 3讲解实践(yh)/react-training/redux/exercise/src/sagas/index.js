import { put, call, takeEvery } from 'redux-saga/effects'
import { SEARCH_BOOK } from '../constants'
import { doFetchBookSuccess, doFetchBookError } from '../actions'


export function* fetchData(action) {
    try {
        const data = yield call(fetchBooks, action.keyword);
        yield put(doFetchBookSuccess(data)) 
    } catch (error) {
        console.log(error)
        yield put(doFetchBookError(error))
    }
}


export function fetchBooks(keyword) {
    return fetch('/books.json')
        .then(response => response.json())
        .then(data => {
            let books = data.books;
            return books.map(book => {
                return {
                    id: book.id,
                    author: book.author,
                    name: book.title,
                    img: book.image
                }
            });
        })

}
export default function* watchFetchData() {
    yield takeEvery(SEARCH_BOOK, fetchData)
}