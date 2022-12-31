import * as types from '../types'

const message = (state = {
    messages: []
}, action) => {
    switch(action.type) {
        case types.PUSH_MESSAGE:
            return {
                messages: [...state.messages, action.payload]
            }
        case types.REMOVE_MESSAGES:
            return {
                messages: state.messages.filter((msg, index) => index!==action.payload)
            }
        default:
            return {
                ...state
            }
    }
    
}

export default message