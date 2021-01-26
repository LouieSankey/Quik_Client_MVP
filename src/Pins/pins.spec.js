import React from 'react';
import ReactDOM from 'react-dom';
import Pins from './pins';
import { BrowserRouter } from 'react-router-dom'



it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(
        <BrowserRouter>
        <Pins />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });