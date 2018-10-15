import axios from 'axios';

import { SEARCH } from './types';

//search for photos
export const searchPhotos = (tag, pageNumber) => dispatch => {
    axios.get(`https://pixabay.com/api/?key=6771879-3964c448f80d04a7a92b37074&q=${tag}&image_type=photo&pretty=true&page=${pageNumber}&per_page=15`)
        .then(res => {
            let photoList = [];
            let photoListItem = {};
            res.data.hits.map(photo => {
                photoListItem = {
                    url: photo.largeImageURL,
                    id: photo.id,
                    user: photo.user,
                    tag: tag
                }
                photoList.push(photoListItem);
            });
            dispatch({
                type: SEARCH,
                payload: photoList
            })
        })
        .catch(err => 
            dispatch({
                type: SEARCH,
                paylaod: null
            })
        );
}