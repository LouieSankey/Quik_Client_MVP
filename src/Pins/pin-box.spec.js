import React from 'react';
import ReactDOM from 'react-dom';
import PinBox from './pin-box';

it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(
      <PinBox/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });