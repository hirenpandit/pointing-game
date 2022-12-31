import { combineReducers } from '@reduxjs/toolkit'
import session from './sessionReducer'
import message from './messageReducer'


const rootReducer = combineReducers({
    session:session,
    messages:message,
})

export default rootReducer