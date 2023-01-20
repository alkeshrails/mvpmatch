import { render } from '@testing-library/react';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'


test('renders learn react link', () => {
  const { getAllByText } = render(
      <Router><App /></Router>
  );

  expect(getAllByText(/Login/i)).toBeTruthy();
});
