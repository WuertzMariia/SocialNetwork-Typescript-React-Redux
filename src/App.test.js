import { render, screen } from '@testing-library/react';
import SocialNetworkApp from "./App";
import React from 'react';
import ReactDOM from 'react-dom';

test('render without crash', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SocialNetworkApp />, div);
  ReactDOM.unmountComponentAtNode(div);

});
