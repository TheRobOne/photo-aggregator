import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Fullscreen from '@material-ui/icons/Fullscreen';
import Star from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
    button: {
        margin: '0px',
        color: 'rgba(255, 255, 255, 255)',
        mini: true,
        variant: 'fab'
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    iconHover: {
        margin: theme.spacing.unit * 2,
        color: 'rgba(255, 255, 255, 0.54)',
        '&:hover': {
          color: red[800],
        },
    },
    iconFavHover: {
        margin: theme.spacing.unit * 2,
        color: red[800],
        '&:hover': {
          color: 'rgba(255, 255, 255, 0.54)',
        },
    }
  });


const Photo = (props) => {
    let { classes, photo, onClickFullscreen, onClickStar } = props;

    return (
        <React.Fragment>
            <img src={photo.smallImageURL} alt="from-pixabay"/>
            <GridListTileBar
            title={"from: " + photo.provider}
                subtitle={<Button className={classes.button} href={photo.userURL}>by: {photo.user}</Button>}
                actionIcon={
                    <div>
                    {
                        sessionStorage.getItem("userID")
                        ? <IconButton className={classes.iconHover} onClick={() => onClickStar()}>
                            <Star /> 
                        </IconButton>
                        : null
                    }
                    <IconButton className={classes.icon} onClick={() => onClickFullscreen()}>
                        <Fullscreen />
                    </IconButton>
                    </div>
                }
            />
        </React.Fragment>
    );
};

export default withStyles(styles)(Photo);