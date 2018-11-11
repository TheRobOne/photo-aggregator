import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Navbar/>
            <MainPage/>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
