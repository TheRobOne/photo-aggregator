import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import store from './store';
import Navbar from './components/Navbar/Navbar';
import InitialPage from './components/InitialPage/InitialPage';
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
        <Router >
          <MuiThemeProvider theme={theme}>
            <div className="App">
              <Navbar/>
              <Switch>
                <Route exact path="/" component={InitialPage}/>
                <Route path="/search" component={Gallery}/>
              </Switch>
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
