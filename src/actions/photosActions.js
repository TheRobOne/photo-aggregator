import axios from 'axios';

import { GET_INITIAL_PHOTOS } from './types';

//get inital
export const getInitialPhotos = () => dispatch => {
    axios.get('https://pixabay.com/api/?key=6771879-3964c448f80d04a7a92b37074&q=fall&image_type=photo&pretty=true&page=1&per_page=15')
        .then(res => {
            let photoList = [];
            let photoListItem = {};
            res.data.hits.map(photo => {
                photoListItem = {
                    url: photo.largeImageURL,
                    id: photo.id,
                    user: photo.user
                }
                photoList.push(photoListItem);
            });
            dispatch({
                type: GET_INITIAL_PHOTOS,
                payload: photoList
            })
        })
        .catch(err => 
            dispatch({
                type: GET_INITIAL_PHOTOS,
                paylaod: null
            })
        );
}