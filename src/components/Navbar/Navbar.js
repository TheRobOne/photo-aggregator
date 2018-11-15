import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withRouter, Route, Link } from 'react-router-dom';

import Search from '../Search/Search';
import Login from '../Login/Login';
import { clearSearchResults } from '../../actions/photosActions';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    }
  });

class Navbar extends Component {

    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Button component={Link} to="/" onClick={() => this.props.clearSearchResults()}>
                            Photo Aggregator
                        </Button>
                        <Search/>
                        {
                            this.props.searchResults.searchResults.length > 0
                            ? <Route exact path={`/search/all/${this.props.searchResults.searchResults[0].tag}}/1`}/>
                            : null
                        }
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Login/>
                        </div>
                    </Toolbar>
                </AppBar>

            </div>
        );
    }
}


Navbar.propTypes = {
    clearSearchResults: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    searchResults: state.searchResults
});

export default connect(mapStateToProps, { clearSearchResults })(withStyles(styles)(withRouter(Navbar)));
