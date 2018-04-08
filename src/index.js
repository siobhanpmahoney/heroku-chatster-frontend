import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {ActionCableProvider} from 'react-actioncable-provider';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle'
import reducers from './reducers';
import * as Actions from './actions'
import { loadState, saveState } from './localStorage'


const persistedState = loadState();


const store = createStore(reducers, persistedState,
  applyMiddleware(thunk)
);


store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000));


ReactDOM.render(<ActionCableProvider url={'ws://chatster-app-api.herokuapp.com/cable'}>
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>, </ActionCableProvider>, document.getElementById('root'));
registerServiceWorker();
