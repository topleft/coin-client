import initialState from './initialState';
import { SET_ERROR, RESET_ERROR } from '../actions/actionTypes';

export default function error(state = initialState.error, action) {
    switch(action.type) {
        case SET_ERROR:
        case RESET_ERROR:
            return action.error;
        default: 
            return state;
    }
}