/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT'
 */

export const DEFAULT_LOCALE = 'en'
export const FETCH_DATA = 'app/FETCH_DATA'
export const FETCH_DATA_SUCCESS = 'app/FETCH_DATA_SUCCESS'
export const FETCH_DATA_ERROR = 'app/FETCH_DATA_ERROR'
export const SET_MSG = 'app/SET_MSG'
export const CLEAR_MSG = 'app/CLEAR_MSG'
