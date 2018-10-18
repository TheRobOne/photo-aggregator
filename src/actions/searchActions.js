import axios from 'axios';
import { _ } from 'underscore';

import { SEARCH } from './types';

const PIXABAY_KEY = '6771879-3964c448f80d04a7a92b37074';
const UNSPLASH_KEY = '82246bcaf2872b60ecc77309da69ce419a5e02ff463d976fff8c6bffbc0a1f8d';

export const searchPhotos = (tag, pageNumber) => dispatch => {
    axios.all([
        axios.get(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${tag}&image_type=photo&pretty=true&page=${pageNumber}&per_page=7`),
        axios.get(`https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_KEY}&query=${tag}&page=${pageNumber}&per_page=8`)
    ])
    .then(axios.spread((pixabayRes, unsplashRes) => {
        let photoList = [];
        let photoListItem = {};

        pixabayRes.data.hits.map(photo => {
            photoListItem = {
                fullImageURL: photo.largeImageURL,
                smallImageURL: photo.webformatURL,
                id: photo.id,
                user: photo.user,
                userURL: `https://pixabay.com/en/users/${photo.user}-${photo.user_id}/`,
                userAvatar: photo.userImageURL,
                tag: tag,
                provider: 'pixabay'
            }
            return photoList.push(photoListItem);
        });

        unsplashRes.data.results.map(photo => {
            photoListItem = {
                fullImageURL: photo.urls.full,
                smallImageURL: photo.urls.small,
                id: photo.id,
                user: photo.user.username,
                userURL: `https://unsplash.com/@${photo.user.username}`,
                userAvatar: photo.user.profile_image.small,
                tag: tag,
                provider: 'unsplash'
            }
            return photoList.push(photoListItem);
        });
        
        let shuffledPhotoList = _.shuffle(photoList);

        dispatch({
            type: SEARCH,
            payload: shuffledPhotoList
        })
    }))
    .catch(err => 
        dispatch({
            type: SEARCH,
            paylaod: null
        })
    );
}