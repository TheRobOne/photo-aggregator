import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar></Navbar>
        </div>
      </Provider>
    );
  }
}

export default App;
