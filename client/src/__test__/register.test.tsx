import { render, screen } from '@testing-library/react';
import {Register} from '../components/Register'
import {BrowserRouter as Router} from 'react-router-dom'

describe('Register Component',()=>{
  test('renders component', () => {
    const component = render(<Router><Register /></Router>);
    expect(component.baseElement).toBeInTheDocument();
  });
  test('renders form', () => {
    const component = render(<Router><Register /></Router>);
    const getForm = screen.getByTestId('register-form')
    expect(getForm).toBeTruthy();
  });
  
})

