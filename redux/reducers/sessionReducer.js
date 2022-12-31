import * as types from '../types'

const initailState = {
    _id: null,
    team: null,
    devs: []
}

const session = (state = {
    data: {...initailState, loading:true}
}, action) => {
    switch(action.type) {
        case types.SET_SESSION:
            return {
                ...state,
                data: {...action.payload, loading:false},
            }
        default:
            return {
                ...state
            }
    }
}

export default session