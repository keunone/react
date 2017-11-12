import {  SEARCH_BOOK, FETCH_BOOK_SUCCESS, FETCH_BOOK_ERROR  } from '../constants'

const initState = {
    keyword: '',
    isLoading: false,
    books: []
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case SEARCH_BOOK:
            return {
                ...state,
                isLoading: action.isLoading,
                keyword: action.keyword
            }
        case FETCH_BOOK_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading,
                books: action.books
            }
        case FETCH_BOOK_ERROR:
            return {
                ...state,
                isLoading: action.isLoading,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer