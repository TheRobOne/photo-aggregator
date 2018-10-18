import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Fullscreen from '@material-ui/icons/Fullscreen';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import { getInitialPhotos } from '../../actions/photosActions';
import { searchPhotos } from '../../actions/searchActions';
import Pagination from '../Pagination/Pagination';

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
      fontSize: 'large'
    },
  });

class Gallery extends Component {

    state = {
        open: false,
        currentPhoto: ''
    }
    
    componentWillMount() {
        this.props.getInitialPhotos();
    }

    onClick(photo){
        this.setState({open: true, currentPhoto: photo})
    }

    handleClose = () => {
        this.setState({ open: false });
      }

    render() {
        const { classes } = this.props;
        let photosList = null;
        let pagination = null;

        if (this.props.searchResults.searchResults.length === 0){
            photosList = this.props.initialPhotos.initialPhotos.map((photo) => 
                <GridListTile key={photo.id} cols={1}>
                    <img src={photo.url} alt="from-pixabay"/>
                    <GridListTileBar
                        title={"from: " + photo.provider}
                        subtitle={<span>by: Author</span>}
                        actionIcon={
                        <IconButton className={classes.icon} onClick={() => this.onClick(photo)}>
                            <Fullscreen />
                        </IconButton>
                        }
                    />
                </GridListTile>
        );
        } else {
            photosList = this.props.searchResults.searchResults.map((photo) => 
                <GridListTile key={photo.id} cols={1}>
                    <img src={photo.smallImageURL} alt="from-pixabay"/>
                    <GridListTileBar
                    title={"from: " + photo.provider}
                        subtitle={<Button className={classes.button} href={photo.userURL}>by: {photo.user}</Button>}
                        actionIcon={
                            <IconButton className={classes.icon} onClick={() => this.onClick(photo)}>
                            <Fullscreen />
                        </IconButton>
                        }
                    />
                </GridListTile>
            );
            pagination = <Pagination/>
        }

        const actions = [
            <Button label="Close" color="primary" onClick={this.handleClose} />
          ]
        
        return (
            <div>
                <div className={classes.root}>
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                        {photosList}
                    </GridList>
                    <Dialog
                        actions={actions}
                        open={this.state.open}
                        onClose={this.handleClose}>
                        <img src={this.state.currentPhoto.fullImageURL} alt="" style={{ width: '100%', height:'100%' }} />
                    </Dialog>
                </div>
                {pagination}
                
            </div>
        )
    }
}

Gallery.propTypes = {
    getInitialPhotos: PropTypes.func.isRequired,
    searchPhotos: PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    initialPhotos: state.initialPhotos,
    searchResults: state.searchResults
});

export default connect(mapStateToProps, { getInitialPhotos, searchPhotos })(withStyles(styles)(Gallery));