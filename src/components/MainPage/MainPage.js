import React from 'react';
import { connect } from 'react-redux';

import InitialPage from '../InitialPage/InitialPage';
import Gallery from '../Gallery/Gallery';

const MainPage = (props) => {
    return (
        <React.Fragment>
            { props.searchResults.searchResults.length === 0
                ? <InitialPage/>
                : <Gallery/>
            }
        </React.Fragment>
    );
};


const mapStateToProps = state => ({
    searchResults: state.searchResults
});

export default connect(mapStateToProps, {})(MainPage);