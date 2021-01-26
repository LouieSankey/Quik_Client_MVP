import React from 'react';
import ReactDOM from 'react-dom';
import ConnectionProfile from './connectionProfile'

it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(
      <ConnectionProfile/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });