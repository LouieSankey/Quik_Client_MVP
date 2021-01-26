import React from 'react';
import ReactDOM from 'react-dom';
import MobileViewPotentialsModal from './mobile-view-potentials-modal';

it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(
      <MobileViewPotentialsModal/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });