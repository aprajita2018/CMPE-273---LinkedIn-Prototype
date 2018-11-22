
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './store/reducers/login';


import jobpostReducer from './store/reducers/jobpost';
import reducer_profile from './store/reducers/reducer_profile';
import { reducer as formReducer } from "redux-form";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    
    login: loginReducer,
    jobpost : jobpostReducer,
    reducer_profile: reducer_profile,
    form: formReducer

});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
<Provider store= {store}>
        <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();