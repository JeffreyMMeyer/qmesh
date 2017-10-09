import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App.jsx'
import reducer from './reducers'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import axios from 'axios'
import tilesMiddleware from './middleware/tiles'
import { addTile } from './actions'

const logger = (store) => (next) => (action) => {
  console.log("action fired", action)
  next(action);
}

var middleware = applyMiddleware(promise(), tilesMiddleware, thunk, logger)

// const store = createStore(reducer)
const store = createStore(
   reducer, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   middleware
 );

//  store.dispatch(addTile(13,8498,6900))
 store.dispatch(addTile(13,8498,6900))
 

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)