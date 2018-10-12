import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/Navbar/Navbar';
import Gallery from './components/Gallery/Gallery';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar></Navbar>
          <Gallery></Gallery>
        </div>
      </Provider>
    );
  }
}

export default App;
