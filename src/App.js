import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import store from './store';
import history from './history';
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';

const theme = createMuiTheme({
  typography: {
      useNextVariants: true,
  },
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <div className="App">
              <Navbar/>
              <MainPage/>
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
