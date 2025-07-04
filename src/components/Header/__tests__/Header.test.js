import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import '@testing-library/jest-dom';
import Header from '../Header';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const createMockStore = (isAuthenticated = false) => {
  const mockReducer = (state = { user: { isAuthenticated } }) => {
    return state;
  };
  return createStore(mockReducer);
};

const renderWithProviders = (component, isAuthenticated = false) => {
  const store = createMockStore(isAuthenticated);
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    renderWithProviders(<Header />);
  });

  it('renders the brand name', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Nguyen Vu Coder')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('shows login and signup buttons when not authenticated', () => {
    renderWithProviders(<Header />, false);
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('shows settings dropdown when authenticated', () => {
    renderWithProviders(<Header />, true);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('navigates to login page when login button is clicked', () => {
    renderWithProviders(<Header />, false);
    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('navigates to register page when signup button is clicked', () => {
    renderWithProviders(<Header />, false);
    const signupButton = screen.getByText('Sign up');
    fireEvent.click(signupButton);
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});
