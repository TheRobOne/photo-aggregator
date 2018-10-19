import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import photosReducer from './photosReducer';
import authorizationReducer from './authorizationReducer';

export default combineReducers({
    searchResults: searchReducer,
    initialPhotos: photosReducer,
    user: authorizationReducer
});