import React from 'react';
import ReactDOM from 'react-dom';
import Connects from './connects'

it('renders without crashing', () => {
    const div = document.createElement('div');

    const user = {
        id: "testId"
    }
  
    ReactDOM.render(
      <Connects matches={[]} user={user}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });