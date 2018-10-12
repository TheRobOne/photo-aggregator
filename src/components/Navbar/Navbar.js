import React, { Component } from "react";
import { searchPhotos } from '../../actions/searchActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchInput: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
    
        this.props.searchPhotos(this.state.searchInput);
      }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value})
    }


    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand">Navbar</a>
                <form className="form-inline" onSubmit={event => this.onSubmit(event)}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search for photos..." 
                        aria-label="Search" name="searchInput" value={this.state.searchInput} onChange={this.onChange}
                    />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
        );
    }
};

Navbar.propTypes = {
    searchPhotos: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
  });

export default connect(mapStateToProps, { searchPhotos })(Navbar);
