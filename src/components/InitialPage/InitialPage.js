import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ProviderCard from './ProviderCard';

const styles = {
    mainDiv: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10
    }
};
  
const InitialPage = (props) => {
    const { classes } = props;
    const pixabay = {
        providerName: 'Pixabay',
        imageSrc: 'https://cdn.pixabay.com/photo/2016/08/14/17/31/pixabay-1593468_960_720.jpg',
        description: `
            Pixabay is a vibrant community of creatives, sharing copyright free images and videos. 
            All contents are released under Creative Commons CC0, 
            which makes them safe to use without asking for permission or giving credit to the artist - even for commercial purposes.
        `,
        providerPage: 'https://pixabay.com/'
    }

    const unsplash = {
        providerName: 'Unsplash',
        imageSrc: 'https://images.unsplash.com/photo-1529458600305-b5bdde535770?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c39705a52156ae53ccca570efa15834a&auto=format&fit=crop&w=1350&q=80',
        description: `
            Founded 4 years ago as a humble Tumblr blog, 
            Unsplash has grown into an industry-leading photography community. 
            It’s become a source of inspiration for everyone from award-winning writers 
            like Deepak Chopra to industry-titans like Apple, and millions of creators worldwide.
        `,
        providerPage: 'https://unsplash.com/'
    }

    return (
        <React.Fragment>
        <div className={classes.mainDiv}>
            <h3>Photo aggreagtor is a web application for searching photos both from <i>Unsplash</i> and <i>Pixabay</i> in one place.</h3>
        </div>
        <div className={classes.mainDiv}>
            <ProviderCard provider={pixabay}/>
            <ProviderCard provider={unsplash}/>
        </div>
        </React.Fragment>
      );
    }

InitialPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InitialPage);