import axios from 'axios';

import { SEARCH } from './types';

//search for photos
export const searchPhotos = () => dispatch => {
    axios.get('https://pixabay.com/api/?key=6771879-3964c448f80d04a7a92b37074&q=yellow+flowers&image_type=photo&pretty=true')
        .then(res => {
            dispatch({
                type: SEARCH,
                payload: res.request.response
            })
        })
        .catch(err => 
            dispatch({
                type: SEARCH,
                paylaod: null
            })
        );
}