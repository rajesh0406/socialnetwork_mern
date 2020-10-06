import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from "redux";
import App from './App';
import { Provider } from "react-redux";
import thunkMiddleWare from "redux-thunk";
import * as serviceWorker from './serviceWorker';
import reducer from '../src/redux/reducer';
const store=createStore(reducer,applyMiddleware(thunkMiddleWare));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
