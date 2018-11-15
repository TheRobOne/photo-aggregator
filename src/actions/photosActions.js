import axios from 'axios';

import { SEARCH } from './types';
import { GET_FAVOURITE_PHOTO } from './types';

const PIXABAY_KEY = '6771879-3964c448f80d04a7a92b37074';
const UNSPLASH_KEY = '82246bcaf2872b60ecc77309da69ce419a5e02ff463d976fff8c6bffbc0a1f8d';

export const searchPhotos = (tag, pageNumber) => dispatch => {
    axios.all([
        axios.get(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${tag}&image_type=photo&pretty=true&page=${pageNumber}&per_page=8`),
        axios.get(`https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_KEY}&query=${tag}&page=${pageNumber}&per_page=7`)
    ])
    .then(axios.spread((pixabayRes, unsplashRes) => {

        const photosCount = pixabayRes.data.totalHits;// + unsplashRes.data.total;
        const pixabayList = mapPixabayPhotos(pixabayRes.data.hits, tag, photosCount, pageNumber);
        const unsplashList = mapUnsplashPhotos(unsplashRes.data.results, tag, photosCount, pageNumber);
        const l = Math.min(pixabayList.length, unsplashList.length);
        let photoList = [];
        for (let i = 0; i < l; i++) {
            photoList.push(pixabayList[i], unsplashList[i]);
        }
        photoList.push(...pixabayList.slice(l), ...unsplashList.slice(l));

        dispatch({
            type: SEARCH,
            payload: photoList
        })
    }))
    .catch(err => 
        dispatch({
            type: SEARCH,
            payload: null
        })
    );
}

export const searchFromOneProvider = (provider, tag, pageNumber) => dispatch => {
    let url = '';
    let photoList = [];
    if(provider === 'pixabay') url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${tag}&image_type=photo&pretty=true&page=${pageNumber}&per_page=15`;
    else if(provider === 'unsplash') url =`https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_KEY}&query=${tag}&page=${pageNumber}&per_page=15`;
    axios.get(url)
    .then(response => {
        if(provider === 'pixabay') photoList = mapPixabayPhotos(response.data.hits, tag, response.data.totalHits, pageNumber);
        else if(provider === 'unsplash') photoList = mapUnsplashPhotos(response.data.results, tag, response.data.tota, pageNumber);
        dispatch({
            type: SEARCH,
            payload: photoList
        })
    })
    .catch(err => 
        dispatch({
            type: SEARCH,
            payload: null
        })
    );
}

export const clearSearchResults = () => dispatch => {
    dispatch({
        type: SEARCH,
        payload: []
    })
}

const mapPixabayPhotos = (photos, tag, photosCount, pageNumber) => {
    let photoList = [];
    let photoListItem = {};

    photos.map(photo => {
        photoListItem = {
            fullImageURL: photo.largeImageURL,
            smallImageURL: photo.webformatURL,
            id: photo.id,
            user: photo.user,
            userURL: `https://pixabay.com/en/users/${photo.user}-${photo.user_id}/`,
            userAvatar: photo.userImageURL,
            tag: tag,
            provider: 'pixabay',
            photosCount: photosCount,
            pageNumber: pageNumber
        }
        return photoList.push(photoListItem);
    });

    return photoList;
}

const mapUnsplashPhotos = (photos, tag, photosCount, pageNumber) => {
    let photoList = [];
    let photoListItem = {};

    photos.map(photo => {
        photoListItem = {
            fullImageURL: photo.urls.full,
            smallImageURL: photo.urls.small,
            id: photo.id,
            user: photo.user.username,
            userURL: `https://unsplash.com/@${photo.user.username}`,
            userAvatar: photo.user.profile_image.small,
            tag: tag,
            provider: 'unsplash',
            photosCount: photosCount,
            pageNumber: pageNumber
        }
        return photoList.push(photoListItem);
    });

    return photoList;
}

export const getFavouritePhotos = (photo) => dispatch => {
    console.log(photo);
    axios.post('http://localhost:4200/photos/favourite', photo)
    .then(res => {
        dispatch({
            type: GET_FAVOURITE_PHOTO,
            payload: res.data
        })
    })
    .catch(err=>
        dispatch({
            type: GET_FAVOURITE_PHOTO,
            payload: null
        })
    )
} 