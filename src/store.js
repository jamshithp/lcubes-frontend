import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index';



const middleware=[thunk];

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
  ));


export default store;