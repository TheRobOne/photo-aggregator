import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Gallery.css';
import axios from 'axios';
import Photo from '../Photo/Photo';
import PropTypes from 'prop-types';
import { getInitialPhotos } from '../../actions/photosActions';

class Gallery extends Component {

    componentWillMount() {
        this.props.getInitialPhotos();
        //this.loadPhotos()
    }

    loadPhotos(){
        axios.get('https://pixabay.com/api/?key=6771879-3964c448f80d04a7a92b37074&q=yellow+flowers&image_type=photoA&page=1&per_page=5')
        .then(res => {
            this.setState({photos: res.data.hits})
        })
        .catch(() =>
            this.setState({photos: null})
        );
    }

    render() {
        let photosList = null;
        if (this.props.searchResults.searchResults.length === 0){
            photosList = this.props.initialPhotos.initialPhotos.map((photo) => 
            <Photo photo={photo.largeImageURL} key={photo.id} />
        );
        } else {
            photosList = this.props.searchResults.searchResults.map((photo) => 
                <Photo photo={photo.largeImageURL} key={photo.id} />
            );
        }
        
        return (
            <div>
                <ul>
                    {photosList}
                </ul>
            </div>
        )
    }
}

Gallery.propTypes = {
    getInitialPhotos: PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    initialPhotos: state.initialPhotos,
    searchResults: state.searchResults
});

export default connect(mapStateToProps, { getInitialPhotos })(Gallery);