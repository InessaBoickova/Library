import {applyMiddleware , combineReducers,compose,legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';

import { book,bookListStyle,filters,identification,listMenu, modal } from '../reducers/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(combineReducers({book,bookListStyle,filters,listMenu,identification,modal}), 
    composeEnhancers(applyMiddleware(thunk)));