import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FacebookLogin from "react-facebook-login";
import Avatar from '@material-ui/core/Avatar';

import { searchPhotos } from '../../actions/photosActions';
import { loginOrRegisterUser } from '../../actions/authorizationActions';

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
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
              width: 200,
            },
        }
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
            searchInput: '',
            open: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onSubmit(event) {
        event.preventDefault();
    
        this.props.searchPhotos(this.state.searchInput, 1);

        this.setState({searchInput: 'Search for photos...'});
      }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value})
    }

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
