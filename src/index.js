import React from 'react';
import ReactDOM from 'react-dom/client';
import { HistoryRouter, history } from '@/utils/history';

import 'antd/dist/antd.min.css'
import './index.css';

import App from './App';

console.log('object');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </React.StrictMode>
);
