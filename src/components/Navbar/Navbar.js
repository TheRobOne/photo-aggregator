import React, { Component } from "react";
import { searchPhotos } from '../../actions/searchActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navbar extends Component {

    onSubmit(event) {
        event.preventDefault();
    
        this.props.searchPhotos();
      }

    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand">Navbar</a>
                <form className="form-inline" onSubmit={event => this.onSubmit(event)}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
        );
    }
};

Navbar.propTypes = {
    searchPhotos: PropTypes.func.isRequired
    //rooms_list: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
  });

export default connect(mapStateToProps, { searchPhotos })(Navbar);
