import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App'
import './index.css';
import 'leaflet/dist/leaflet.css'

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
   <App />
  </BrowserRouter>,
    document.getElementById('root')
     

)