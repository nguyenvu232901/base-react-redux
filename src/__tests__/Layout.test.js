import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../Layout';

// Use function in jest.mock to avoid hoisting issues
jest.mock('../components/User/User', () => {
  const MockUser = () => <div data-testid='user-component'>User Component</div>;
  MockUser.displayName = 'MockUser';
  return MockUser;
});

jest.mock('../components/Admin/Admin', () => {
  const MockAdmin = () => <div data-testid='admin-component'>Admin Component</div>;
  MockAdmin.displayName = 'MockAdmin';
  return MockAdmin;
});

jest.mock('../components/Home/HomePage', () => {
  const MockHomePage = () => <div data-testid='homepage-component'>HomePage Component</div>;
  MockHomePage.displayName = 'MockHomePage';
  return MockHomePage;
});

jest.mock('../components/Auth/Login', () => {
  const MockLogin = () => <div data-testid='login-component'>Login Component</div>;
  MockLogin.displayName = 'MockLogin';
  return MockLogin;
});

jest.mock('../components/Auth/Register', () => {
  const MockRegister = () => <div data-testid='register-component'>Register Component</div>;
  MockRegister.displayName = 'MockRegister';
  return MockRegister;
});

jest.mock('../App', () => {
  const MockApp = ({ children }) => <div data-testid='app-component'>{children}</div>;
  MockApp.displayName = 'MockApp';
  MockApp.propTypes = {
    children: PropTypes.node,
  };
  return MockApp;
});

const renderWithRouter = component => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Layout Component', () => {
  test('renders without crashing', () => {
    renderWithRouter(<Layout />);
    expect(screen.getByTestId('app-component')).toBeInTheDocument();
  });

  test('renders ToastContainer', () => {
    renderWithRouter(<Layout />);
    // ToastContainer should be present
    expect(document.querySelector('.Toastify')).toBeInTheDocument();
  });

  test('has proper routing structure', () => {
    renderWithRouter(<Layout />);
    // Check if the main app container is rendered
    expect(screen.getByTestId('app-component')).toBeInTheDocument();
  });
});
