import * as types from './actionTypes';

export function setError(errMsg) {
    console.log('in the error action')
    return {
        type: types.SET_ERROR,
        error: { 
            isOpen: true, 
            errMsg
        }
    }
}
export function resetError() {
    return {
        type: types.RESET_ERROR,
        error: { 
            isOpen: false, 
            errMsg: ''
        }
    }
}