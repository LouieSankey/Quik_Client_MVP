import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './landing-page';
import LandingPage from './landing-page'

it('renders without crashing', () => {
    const div = document.createElement('div');

    const user = {
        id: "testId"
    }
  
    ReactDOM.render(
      <Landing/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });