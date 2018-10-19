import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { searchPhotos } from '../../actions/photosActions';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});

class Pagination extends Component {

    onClick(number){
        this.props.searchPhotos(this.props.searchResults.searchResults[0].tag, number);
    }

    render() {
        const { classes } = this.props;
        let divStyle = {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10
        }
        return (
            <div style={divStyle}>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onClick(1)}>
                    1
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onClick(2)}>
                    2
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onClick(3)}>
                    3
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onClick(4)}>
                    4
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onClick(5)}>
                    5
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onClick(6)}>
                    6
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onClick(7)}>
                    7
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onClick(8)}>
                    8
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onClick(9)}>
                    9
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onClick(10)}>
                    10
                </Button>
            </div>
        )
    }
}


Pagination.propTypes = {
    searchPhotos: PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    searchResults: state.searchResults
});

export default connect(mapStateToProps, { searchPhotos })(withStyles(styles)(Pagination));