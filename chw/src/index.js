import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import App from './app/App'
import { BrowserRouter ,HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store";
import './config/axios'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //remove strict mode to production
   //<React.StrictMode>
    <Provider store={store}>
    <HashRouter>
    <App/>
    </HashRouter>
    </Provider>
   //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();