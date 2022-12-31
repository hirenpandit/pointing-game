import * as types from '../types'

export const messages = (msg) => dispatch =>{
    dispatch({
        type: types.PUSH_MESSAGE,
        payload: msg
    })
}

export const remove  = (index) => dispatch => {
    dispatch({
        type: types.REMOVE_MESSAGES,
        payload: index
    })
}