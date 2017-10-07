import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App.jsx'
import reducer from './reducers'
import thunk from 'redux-thunk'
import axios from 'axios'

const logger = (store) => (next) => (action) => {
  console.log("action fired", action)
  next(action);
}

var middleware = applyMiddleware(logger)

// const store = createStore(reducer)
 const store = createStore(
   reducer, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   middleware
 );

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)