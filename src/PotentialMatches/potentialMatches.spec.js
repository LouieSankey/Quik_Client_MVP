import React from 'react';
import ReactDOM from 'react-dom';
import PotentialMatch from './potentialMatch';
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(
      <BrowserRouter>
        <PotentialMatch/>
      </BrowserRouter>
     , div);
    ReactDOM.unmountComponentAtNode(div);
  });