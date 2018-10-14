import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { getInitialPhotos } from '../../actions/photosActions';

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
  });

class Gallery extends Component {

    componentWillMount() {
        this.props.getInitialPhotos();
    }

    render() {
        const { classes } = this.props;
        let photosList = null;

        if (this.props.searchResults.searchResults.length === 0){
            photosList = this.props.initialPhotos.initialPhotos.map((photo) => 
                <GridListTile key={photo.id} cols={1}>
                    <img src={photo.largeImageURL} alt="from-pixabay"/>
                </GridListTile>
        );
        } else {
            photosList = this.props.searchResults.searchResults.map((photo) => 
                <GridListTile key={photo.id} cols={1}>
                    <img src={photo.largeImageURL} alt="from-pixabay"/>
                </GridListTile>
            );
        }
        
        return (
            <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {photosList}
                </GridList>
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

export default connect(mapStateToProps, { getInitialPhotos })(withStyles(styles)(Gallery));