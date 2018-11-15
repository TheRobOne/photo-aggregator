import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { logout } from '../../actions/authorizationActions';

class Profile extends Component {
  logoutUser(){
    sessionStorage.clear();
    this.props.logout();
    this.props.history.push('/');
  }  
  
  render() {
      return (
        <div>
          <h2>Hello {sessionStorage.getItem('name')}</h2>
          <button onClick={() => this.logoutUser()}>logout</button>
        </div>
      )
    }
}

Profile.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default withRouter(connect(mapStateToProps, {logout})(Profile));