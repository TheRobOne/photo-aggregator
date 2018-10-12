import axios from 'axios';

import { GET_INITIAL_PHOTOS } from './types';

//get inital
export const getInitialPhotos = () => dispatch => {
    axios.get('https://pixabay.com/api/?key=6771879-3964c448f80d04a7a92b37074&q=fall&image_type=photo&pretty=true&page=1&per_page=5')
        .then(res => {
            dispatch({
                type: GET_INITIAL_PHOTOS,
                payload: res.data.hits
            })
        })
        .catch(err => 
            dispatch({
                type: GET_INITIAL_PHOTOS,
                paylaod: null
            })
        );
}