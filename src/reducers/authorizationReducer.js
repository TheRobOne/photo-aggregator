import { LOGIN } from '../actions/types';

const initialState = {
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return{
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}