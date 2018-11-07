import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });
  

const PaginationButton = (props) => {
    const { classes } = props;
    return (
        <Button key={props.key} variant="contained" color="primary" className={classes.button} onClick={() => props.onClick()}>
            {props.pageNumber}
        </Button>
    );
};

PaginationButton.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PaginationButton);