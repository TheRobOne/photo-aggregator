import { combineReducers } from 'redux';
import photosReducer from './photosReducer';
import authorizationReducer from './authorizationReducer';

export default combineReducers({
    searchResults: photosReducer,
    user: authorizationReducer
});