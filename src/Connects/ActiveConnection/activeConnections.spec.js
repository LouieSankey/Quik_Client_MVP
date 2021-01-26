import React from 'react';
import ReactDOM from 'react-dom';
import ActiveConnection from './activeConnection'

it('renders without crashing', () => {
    const div = document.createElement('div');

    const user = {
        id: "testId"
    }
  
    ReactDOM.render(
      <ActiveConnection user={user}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });