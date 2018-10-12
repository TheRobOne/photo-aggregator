import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import photosReducer from './photosReducer';

export default combineReducers({
    searchResults: searchReducer,
    initialPhotos: photosReducer
});