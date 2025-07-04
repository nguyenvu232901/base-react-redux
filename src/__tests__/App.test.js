import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import '@testing-library/jest-dom';
import App from '../App';

// Mock reducer for testing
const mockReducer = (state = { user: { isAuthenticated: false } }) => {
  return state;
};

const renderWithProviders = component => {
  const store = createStore(mockReducer);
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('App Component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<App />);
  });

  it('renders the app container', () => {
    renderWithProviders(<App />);
    const appContainer = document.querySelector('.app-container');
    expect(appContainer).toBeInTheDocument();
  });

  it('renders header container', () => {
    renderWithProviders(<App />);
    const headerContainer = document.querySelector('.header-container');
    expect(headerContainer).toBeInTheDocument();
  });

  it('renders main container', () => {
    renderWithProviders(<App />);
    const mainContainer = document.querySelector('.main-container');
    expect(mainContainer).toBeInTheDocument();
  });

  it('renders app content area', () => {
    renderWithProviders(<App />);
    const appContent = document.querySelector('.app-content');
    expect(appContent).toBeInTheDocument();
  });
});
