import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'; 

import { searchPhotos } from '../../actions/photosActions';
import { searchFromOneProvider } from '../../actions/photosActions';
import PaginationButton from './PaginationButton';

class Pagination extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            pagesCount: 30
        }
    }

    onClick(pageNumber){
        const { searchResults } = this.props.searchResults;
        if(searchResults.some(photo => photo.provider === 'unsplash') && searchResults.some(photo => photo.provider === 'pixabay')){
            this.props.searchPhotos(this.props.searchResults.searchResults[0].tag, pageNumber);
            this.props.history.push(`/search/all/${this.props.searchResults.searchResults[0].tag}/${pageNumber}`)
        } else if(searchResults.some(photo => photo.provider === 'unsplash')){
            this.props.searchFromOneProvider('unsplash', this.props.searchResults.searchResults[0].tag, 1);
            this.props.history.push(`/search/unsplash/${this.props.searchResults.searchResults[0].tag}/${pageNumber}`)
        } else {
            this.props.searchFromOneProvider('pixabay', this.props.searchResults.searchResults[0].tag, 1);
            this.props.history.push(`/search/pixabay/${this.props.searchResults.searchResults[0].tag}/${pageNumber}`)
        }
        
        this.setState({currentPage: pageNumber});
    }

    createPagination = () => {
        let pagination = [];
        const { currentPage, pagesCount } = this.state;
        if(currentPage <= 5){
            pagination = this.iteratePaginationButton((1), (10));
        } else if(currentPage >= (pagesCount - 5) && currentPage <= (pagesCount)){
            pagination = this.iteratePaginationButton((pagesCount - 9), (pagesCount));
        } else {
            pagination = this.iteratePaginationButton((currentPage - 4), (currentPage + 5));
        }
        
        return pagination;
    }

    iteratePaginationButton = (firstButton, lastButton) => {
        let pagination = [];
        for (let i = firstButton; i <= lastButton; i++){
            pagination.push(
                <PaginationButton key={i} pageNumber={i} onClick={() => this.onClick(i)}/>
            )
        }
        return pagination;
    }
    
    render() {
        const divStyle = {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10
        }
        return (
            <div style={divStyle}>
                {this.createPagination()}
            </div>
        )
    }
}


Pagination.propTypes = {
    searchPhotos: PropTypes.func.isRequired,
    searchFromOneProvider: PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    searchResults: state.searchResults
});

export default withRouter(connect(mapStateToProps, { searchPhotos, searchFromOneProvider })(Pagination));