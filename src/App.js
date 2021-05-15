import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
// import { Chart } from 'react-chartjs-2';
// import validate from 'validate.js';
// import { chartjs } from './helpers';
// import validators from './common/validators';
import Routes from './Routes';

const browserHistory = createBrowserHistory();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
