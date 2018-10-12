import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { searchPhotos } from '../../actions/searchActions';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit * 3,
          width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
    }
  });

class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchInput: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
    
        this.props.searchPhotos(this.state.searchInput);
        console.log(this.state)

        this.setState({searchInput: 'Search for photos...'});
      }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value})
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Photos
                        </Typography>
                        <form onSubmit={event => this.onSubmit(event)}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                                }}
                                name="searchInput"
                                onChange={this.onChange}
                            />
                        </div>
                        </form>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
};

Navbar.propTypes = {
    searchPhotos: PropTypes.func.isRequired
};
  
const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { searchPhotos })(withStyles(styles)(Navbar));
