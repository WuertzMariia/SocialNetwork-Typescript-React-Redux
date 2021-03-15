import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SocialNetworkApp from "./App";


export let rerenderEntireTree = () => {
  ReactDOM.render(<SocialNetworkApp/>, document.getElementById('root'));
  reportWebVitals();
}
rerenderEntireTree(); 
