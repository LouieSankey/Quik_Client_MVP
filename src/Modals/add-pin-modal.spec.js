import React from 'react';
import ReactDOM from 'react-dom';
import AddPinModal from './add-pin-modal';

it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(
      <AddPinModal/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });