import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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
            dialogMessage: 'You have to been logged in first.'
        }
        this.handleClose = this.handleClose.bind(this);
    }

    onClickFullscreen(photo, iconType){
        this.setState({open: true, currentPhoto: photo, dialogType: iconType});
    }

    onClickStar(photo){
        if (sessionStorage.getItem("userID")) {
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
                    console.log("err");
                    this.setState({open: true, currentPhoto: photo, dialogType: 'star', dialogMessage: 'Error while adding photo to favourities'});
                })

        } else {
            this.setState({open: true, currentPhoto: photo});
        }
    }

    handleClose = () => {
        this.setState({ open: false, dialogMessage: 'You have to been logged in first.' });
      }

    render() {
        let { classes } = this.props;

        let photosList = null;
        let dialogContent = null;

        if(this.state.dialogType === 'fullscreen'){
            dialogContent = (
                <img src={this.state.currentPhoto.fullImageURL} alt="" style={{ width: '100%', height:'100%' }} />
            );
        } else if (!sessionStorage.getItem("userID") || this.state.dialogType === 'star') {
            dialogContent = (
                <DialogContent>
                        <span>{this.state.dialogMessage}<br/><br/></span>
                </DialogContent>
            );
        } 

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
                        {dialogContent}
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