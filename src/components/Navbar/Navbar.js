import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FacebookLogin from "react-facebook-login";
import Avatar from '@material-ui/core/Avatar';

import { searchPhotos } from '../../actions/photosActions';
import { loginOrRegisterUser } from '../../actions/authorizationActions';
import Search from '../Search/Search';

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

    constructor(props){
        super(props);
        this.state = {
            open: false
        };
    }

    responseFacebook = response => {
        let user = {
            userID: response.userID,
            name: response.name,
            email: response.email,
            avatar: response.picture.data.url
        }
        this.props.loginOrRegisterUser(user);
        sessionStorage.setItem('userID', response.userID);
        sessionStorage.setItem('name', response.name);
        sessionStorage.setItem('email', response.email);
        sessionStorage.setItem('avatar', response.picture.data.url);

        this.setState({ open: false });
      };

    onClick(){
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({ open: false });
      }

    render() {
        const { classes } = this.props;

        let fbContent;
        let loginContent;

        if (sessionStorage.getItem("userID")) {
        fbContent = (
            <div
            style={{
                width: "400px",
                margin: "auto",
                background: "#f4f4f4",
                padding: "20px"
            }}
            >
            <img src={this.state.picture} alt={this.state.name} />
            Welcome {this.state.name}
            Email: {this.state.email}
            </div>
        );

        loginContent = (
            <div className={classes.row}>
                <Avatar alt={sessionStorage.getItem("name")} src={sessionStorage.getItem("avatar")} className={classes.avatar} />
            </div>
        );
        } else {
        fbContent = (
            <FacebookLogin
            appId="244842079714480"
            autoLoad={false}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            style={{
                width: "400px",
                margin: "auto",
                background: "#f4f4f4",
                padding: "20px"
            }}
            />
        );

        loginContent = (
            <Button color="inherit" onClick={() => this.onClick()}>Login</Button>
        );
        }


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
                            {loginContent}
                        </div>
                    </Toolbar>
                </AppBar>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                        <span>Use your Facebook account to login. <br/><br/></span>
                        {fbContent}
                </DialogContent>
                </Dialog>
            </div>
        );
    }
};

Navbar.propTypes = {
    searchPhotos: PropTypes.func.isRequired,
    loginOrRegisterUser: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { searchPhotos, loginOrRegisterUser })(withStyles(styles)(Navbar));
