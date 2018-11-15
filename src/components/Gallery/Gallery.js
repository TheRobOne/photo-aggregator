import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { searchPhotos } from '../../actions/photosActions';
import Pagination from '../Pagination/Pagination';
import PhotoProvider from '../PhotoProvider/PhotoProvider';
import Photo from './Photo';

const styles = theme => ({
    root: {
      marginTop: 10,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1000,
      height: '100%',
    },
    subheader: {
      width: '100%',
    },
    input: {
        display: 'none',
    },
  });

class Gallery extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            currentPhoto: '',
            dialogType: '',
            favUserPhotos: []
        }
        this.handleClose = this.handleClose.bind(this);
    }

    onClickFullscreen(photo, iconType){
        this.setState({open: true, currentPhoto: photo, dialogType: iconType});
    }

    onClickStar(photo){
        const Photo = {
            fullPhotoURL: photo.fullImageURL,
            smallPhotoURL: photo.smallImageURL,
            userID: sessionStorage.getItem("userID"),
            author: photo.user,
            authorURL: photo.userURL,
            authorAvatar: photo.userAvatar,
            tag: photo.tag,
            provider: photo.provider
        }
        axios.post('http://localhost:4200/photos/favourite', Photo)
            .then(res => {
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleClose = () => {
        this.setState({ open: false});
      }

    render() {
        let { classes } = this.props;

        let photosList = null;

        photosList = this.props.searchResults.searchResults.map((photo) => 
            <GridListTile key={photo.id} cols={1}>
                <Photo key={photo.id} photo={photo} onClickFullscreen={() => this.onClickFullscreen(photo, "fullscreen")} onClickStar={() => this.onClickStar(photo)}/>
            </GridListTile>
        );
        
        return (
            <div>
                <PhotoProvider/>
                <div className={classes.root}>
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                        {photosList}
                    </GridList>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}>
                        <img src={this.state.currentPhoto.fullImageURL} alt="" style={{ width: '100%', height:'100%' }} />
                    </Dialog>
                </div>
                <Pagination/>
            </div>
        )
    }
}

Gallery.propTypes = {
    searchPhotos: PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    searchResults: state.searchResults
});

export default withRouter(connect(mapStateToProps, { searchPhotos })(withStyles(styles)(Gallery)));