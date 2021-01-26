import React from 'react';
import ReactDOM from 'react-dom';
import SignupModal from './signup-modal';
import SingupModal from './signup-modal'

it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(
      <SignupModal/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });