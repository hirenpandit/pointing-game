import { getSession } from '../../lib/request';
import * as types from '../types'

export const retrieveSession = (id) => dispatch => {
    getSession(id).then(data => {
        dispatch({
            type:types.GET_SESSION,
            payload: {
                ...data
            }
        });
    })
    
}