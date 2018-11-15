import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Fullscreen from '@material-ui/icons/Fullscreen';
import Star from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import red from '@material-ui/core/colors/red';
import DialogContent from '@material-ui/core/DialogContent';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { searchPhotos } from '../../actions/photosActions';
import Pagination from '../Pagination/Pagination';
import PhotoProvider from '../PhotoProvider/PhotoProvider';

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
    button: {
        margin: '0px',
        color: 'rgba(255, 255, 255, 255)',
        mini: true,
        variant: 'fab'
      },
    input: {
        display: 'none',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    iconHover: {
        margin: theme.spacing.unit * 2,
        color: 'rgba(255, 255, 255, 0.54)',
        '&:hover': {
          color: red[800],
        },
    },
    iconFavHover: {
        margin: theme.spacing.unit * 2,
        color: red[800],
        '&:hover': {
          color: 'rgba(255, 255, 255, 0.54)',
        },
    }
  });

class Gallery extends Component {

    state = {
        open: false,
        currentPhoto: '',
        dialogType: '',
        dialogMessage: 'You have to been loged in first.'
    }

    onClick(photo, iconType){
        this.setState({open: true, currentPhoto: photo, dialogType: iconType});
    }

    onClickStar(photo, iconType){
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
                    this.setState({open: true, currentPhoto: photo, dialogType: iconType, dialogMessage: 'Error while adding photo to favourities'});
                })

        } else {
            this.setState({open: true, currentPhoto: photo});
        }
    }

    handleClose = () => {
        this.setState({ open: false, dialogMessage: 'You have to been loged in first.' });
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
                <img src={photo.smallImageURL} alt="from-pixabay"/>
                <GridListTileBar
                title={"from: " + photo.provider}
                    subtitle={<Button className={classes.button} href={photo.userURL}>by: {photo.user}</Button>}
                    actionIcon={
                        <div>
                        <IconButton className={classes.iconHover} onClick={() => this.onClickStar(photo, "star")}>
                            <Star /> 
                        </IconButton>
                        <IconButton className={classes.icon} onClick={() => this.onClick(photo, "fullscreen")}>
                            <Fullscreen />
                        </IconButton>
                        </div>
                    }
                />
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