import { GET_INITIAL_PHOTOS } from '../actions/types';

const initialState = {
    initialPhotos: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_INITIAL_PHOTOS:
            return {
                ...state,
                initialPhotos: action.payload
            }
        default:
            return state;
    }
}