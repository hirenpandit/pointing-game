import { combineReducers } from '@reduxjs/toolkit'
import session from './sessionReducer'


const rootReducer = combineReducers({
    session:session
})

export default rootReducer