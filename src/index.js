import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BronserRouter } from 'react-router-dom'

ReactDOM.render(
  <BronserRouter>
    <App />
    </BronserRouter>,
  document.getElementById('root'),
);
