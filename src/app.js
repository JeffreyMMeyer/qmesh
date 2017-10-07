import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App.jsx'
import reducer from './reducers'

// const store = createStore(reducer)
 const store = createStore(
   reducer, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)