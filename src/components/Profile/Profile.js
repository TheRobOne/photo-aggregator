import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { logout } from '../../actions/authorizationActions';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      favPhotos: [],
      isLoading: true
    }
  }

  logoutUser(){
    sessionStorage.clear();
    this.props.logout();
    this.props.history.push('/');
  }  

  componentDidMount(){
    axios.get(`http://localhost:4200/photos/favourite/${sessionStorage.getItem('userID')}`)
    .then(res => {
      this.setState({favPhotos: res.data, isLoading: false});
    })
    .catch(err => {
        console.log(err);
    })
  }
  
  render() {
    const { favPhotos, isLoading } = this.state;
      return (
        <div>
          <h2>Hello {sessionStorage.getItem('name')}</h2>
          <button onClick={() => this.logoutUser()}>logout</button>
          {
            !isLoading 
            ? ( favPhotos.map(photo => 
                <img key={photo._id} src={photo.smallPhotoURL} alt={photo.tag}/>
              ))
            : <p>Loading...</p>
          }
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