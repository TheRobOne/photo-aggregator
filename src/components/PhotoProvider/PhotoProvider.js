import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { searchPhotos } from '../../actions/photosActions';
import { searchFromOneProvider } from '../../actions/photosActions';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class PhotoProvider extends Component {

   
    onClick(photoProvider) {
        if(photoProvider === 'pixabay' || photoProvider === 'unsplash'){
            this.props.searchFromOneProvider(photoProvider, this.props.searchResults.searchResults[0].tag, 1);
        } 
        else if(photoProvider === 'all'){
            this.props.searchPhotos(this.props.searchResults.searchResults[0].tag, 1);
        } 
    }

    render() {
        let { classes } = this.props;
        let divStyle = {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10
        }
        return (
            <div style={divStyle}>
                <Button variant="contained" className={classes.button} onClick={() => this.onClick('pixabay')}>
                    Pixabay
                </Button>
                <Button variant="contained" className={classes.button} onClick={() => this.onClick('all')}>
                    All
                </Button>
                <Button variant="contained" className={classes.button} onClick={() => this.onClick('unsplash')}>
                    Unsplash
                </Button>
            </div>
        )
    }
}

PhotoProvider.propTypes = {
    searchPhotos: PropTypes.func.isRequired,
    searchFromOneProvider: PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    searchResults: state.searchResults
});

export default connect(mapStateToProps, { searchPhotos, searchFromOneProvider })(withStyles(styles)(PhotoProvider));