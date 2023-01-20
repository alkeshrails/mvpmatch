import { render, screen } from '@testing-library/react';
import {SellerDashboard} from '../components/SellerDashboard'
import {BrowserRouter as Router} from 'react-router-dom'

describe('SellerDashboard Component',()=>{
  test('renders component', () => {
    const component = render(<Router><SellerDashboard /></Router>);
    expect(component.baseElement).toBeInTheDocument();
  });
  test('renders form', () => {
    const component = render(<Router><SellerDashboard /></Router>);
    const getForm = screen.getByTestId('seller-id')
    expect(getForm).toBeTruthy();
  });
  
})

