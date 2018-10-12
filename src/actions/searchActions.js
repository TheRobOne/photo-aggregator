import axios from 'axios';

import { SEARCH } from './types';

//search for photos
export const searchPhotos = (tag) => dispatch => {
    axios.get(`https://pixabay.com/api/?key=6771879-3964c448f80d04a7a92b37074&q=${tag}&image_type=photo&pretty=true&page=1&per_page=5`)
        .then(res => {
            dispatch({
                type: SEARCH,
                payload: res.data.hits
            })
        })
        .catch(err => 
            dispatch({
                type: SEARCH,
                paylaod: null
            })
        );
}