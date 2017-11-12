import { SEARCH_BOOK, FETCH_BOOK_SUCCESS, FETCH_BOOK_ERROR } from '../constants'

export function doSearchBook(keyword){
    return {
        type: SEARCH_BOOK,
        isLoading: true,
        keyword,
    }
}

export function doFetchBookSuccess(books) {
    return {
        type: FETCH_BOOK_SUCCESS,
        isLoading: false,
        books
    }
}

export function doFetchBookError(error) {
    return {
        type: FETCH_BOOK_ERROR,
        isLoading: false,
        error
    }
}