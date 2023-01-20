import { render, screen } from '@testing-library/react';
import {Login} from '../components/Login'
import {BrowserRouter as Router} from 'react-router-dom'

describe('Login Component',()=>{
  test('renders component', () => {
    const component = render(<Router><Login /></Router>);
    expect(component.baseElement).toBeInTheDocument();
  });
  test('renders form', () => {
    const component = render(<Router><Login /></Router>);
    const getForm = screen.getByTestId('form')
    expect(getForm).toBeTruthy();
  });
  
})

