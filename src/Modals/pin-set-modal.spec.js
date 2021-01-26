import React from 'react';
import ReactDOM from 'react-dom';
import PinSetModal from './pin-set-modal';

it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(
      <PinSetModal/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });