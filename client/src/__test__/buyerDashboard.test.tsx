import { render, screen } from '@testing-library/react';
import {BuyerDashboard} from '../components/BuyerDashoard'
import {BrowserRouter as Router} from 'react-router-dom'

describe('BuyerDashboard Component',()=>{
  test('renders component', () => {
    const component = render(<Router><BuyerDashboard /></Router>);
    expect(component.baseElement).toBeInTheDocument();
  });
  test('renders form', () => {
    const component = render(<Router><BuyerDashboard /></Router>);
    const getForm = screen.getByTestId('buyer-id')
    expect(getForm).toBeTruthy();
  });
  
})

