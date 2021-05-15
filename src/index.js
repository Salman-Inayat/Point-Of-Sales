import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes'
import reducer from "../src/redux/reducers/index"
import {Provider} from "react-redux"
import {createStore} from "redux"
import {BrowserRouter as Router}  from 'react-router-dom'
import firebase from "firebase/app"

const config = {
  apiKey: "AIzaSyDjwvaMWwluwPZIHQFD9h4M995idDVtKHs",
  authDomain: "mod5project-35643.firebaseapp.com",
  databaseURL: "https://mod5project-35643.firebaseio.com",
  projectId: "mod5project-35643",
  storageBucket: "mod5project-35643.appspot.com",
  messagingSenderId: "511470486834"
};


// const config = {
//   apiKey: "AIzaSyAYXwT-tbfWvuKqxrWW-5ENNlTOfNGo_qM",
//   authDomain: "fyp-osama.firebaseapp.com",
//   projectId: "fyp-osama",
//   storageBucket: "fyp-osama.appspot.com",
//   messagingSenderId: "544702753356",
//   appId: "1:544702753356:web:0d4314d3e3ace5b8c622e9",
//   measurementId: "G-1VJJE20RW8"
// };

firebase.initializeApp(config);

let store = createStore(reducer)

// ReactDOM.render(<Provider store={store}>
//       <React.StrictMode>
//       <App/> 
//  </React.StrictMode>
// </Provider>, document.getElementById('root')
// );


// console.log("store",store)
ReactDOM.render(  
    <Provider store={store}>
      <Router>
        <App/> 
      </Router>
    </Provider>, 
    document.getElementById('root')
  );


// serviceWorker.unregister();
registerServiceWorker();