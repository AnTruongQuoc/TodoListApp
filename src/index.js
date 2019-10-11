import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './pages/mainApp/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
//Store
import { createStore } from 'redux'
import myReducer from './reducers/index'
import { Provider } from 'react-redux'
const store = createStore(myReducer)

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <SnackbarProvider maxSnack={3} iconVariant='success'>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>
    , document.getElementById('TodoApp')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
