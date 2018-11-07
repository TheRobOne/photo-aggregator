import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { searchPhotos } from '../../actions/photosActions';
import PaginationButton from './PaginationButton';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});

class Pagination extends Component {

    onClick(number){
        this.props.searchPhotos(this.props.searchResults.searchResults[0].tag, number);
    }

    createPagination = (classes) => {
        let pagination = [];
        for (let i = 1; i <= 10; i++){
            pagination.push(
                <PaginationButton key={i} pageNumber={i} onClick={() => this.onClick(i)}/>
            )
        }
        return pagination;
    }

    render() {
        const { classes } = this.props;
        const divStyle = {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10
        }
        return (
            <div style={divStyle}>
                {this.createPagination(classes)}
            </div>
        )
    }
}


Pagination.propTypes = {
    searchPhotos: PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    searchResults: state.searchResults
});

export default connect(mapStateToProps, { searchPhotos })(withStyles(styles)(Pagination));