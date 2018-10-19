import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Navbar from './components/Navbar/Navbar';
import Gallery from './components/Gallery/Gallery';

const theme = createMuiTheme({
  typography: {
      useNextVariants: true,
  },
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Navbar></Navbar>
            <Gallery></Gallery>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
