import React from 'react';
import ReactDOM from 'react-dom';
import DemoModal from './demo-modal'

it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(
      <DemoModal/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });