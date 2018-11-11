import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      maxWidth: 345,
      margin: 30,
      marginTop: 10
    },
    media: {
      objectFit: 'cover',
    },
    mainDiv: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10
    }
};

const ProviderCard = (props) => {
    const { classes } = props;
    const { providerName, imageSrc, description, providerPage} = props.provider;

    const onClick = (url) => {
        const win = window.open(url, '_blank');
        win.focus();
    }

    return (
        <Card className={classes.card}>
        <CardActionArea
            onClick={() => onClick(providerPage)}
        >
            <CardMedia
            component="img"
            alt={providerName}
            className={classes.media}
            height="140"
            image={imageSrc}
            title={providerName}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {providerName}
            </Typography>
            <Typography component="p">
                {description}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
};

ProviderCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProviderCard);