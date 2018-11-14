import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Search from '../Search/Search';
import Login from '../Login/Login';

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

const Navbar = (props) => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Photo aggregator
                    </Typography>
                    <Search/>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Login/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
