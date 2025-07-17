import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import 'nprogress/nprogress.css';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Debug logging
// eslint-disable-next-line no-console
console.log('🚀 Starting React app with persist fallback...');
// eslint-disable-next-line no-console
console.log('📦 Store:', store);
// eslint-disable-next-line no-console
console.log('� Persistor:', persistor);
// eslint-disable-next-line no-console
console.log('🌍 Environment:', process.env.NODE_ENV);
// eslint-disable-next-line no-console
console.log('📍 Current URL:', window.location.href);

// Enhanced loading component with timeout
const LoadingComponent = () => {
  const [showFallback, setShowFallback] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('⏳ PersistGate is loading...');

    // Show fallback option after 5 seconds
    const timer = setTimeout(() => {
      // eslint-disable-next-line no-console
      console.warn('⚠️ PersistGate loading timeout - showing fallback option');
      setShowFallback(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSkipPersist = () => {
    // eslint-disable-next-line no-console
    console.log('🔄 User chose to skip persist - clearing data...');

    // Clear localStorage
    try {
      localStorage.removeItem('persist:root');
      // eslint-disable-next-line no-console
      console.log('🗑️ Cleared persist data from localStorage');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to clear localStorage:', error);
    }

    // Reload page
    window.location.reload();
  };

  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        background: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>🔄 Loading Application...</h2>
      <p>Initializing Redux store and persisted state...</p>

      {showFallback && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            background: '#fff3cd',
            borderRadius: '8px',
            border: '1px solid #ffeaa7',
          }}
        >
          <h4>⚠️ Loading is taking longer than expected</h4>
          <p>This might be due to an issue with saved data.</p>
          <button
            onClick={handleSkipPersist}
            style={{
              padding: '10px 20px',
              background: '#ffc107',
              color: '#212529',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🔄 Clear Data & Continue
          </button>
        </div>
      )}
    </div>
  );
};

try {
  // eslint-disable-next-line no-console
  console.log('🎯 Creating React root...');
  const root = ReactDOM.createRoot(document.getElementById('root'));

  // eslint-disable-next-line no-console
  console.log('🎨 Rendering app with persist...');
  root.render(
    <ErrorBoundary>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id'}
      >
        <Provider store={store}>
          <PersistGate
            loading={<LoadingComponent />}
            persistor={persistor}
            onBeforeLift={() => {
              // eslint-disable-next-line no-console
              console.log('🔄 PersistGate: About to lift app...');
            }}
          >
            <BrowserRouter>
              <Layout />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );

  // eslint-disable-next-line no-console
  console.log('✅ App render completed successfully');
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('❌ Failed to render app:', error);

  // Fallback rendering
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial, sans-serif; text-align: center;">
        <h1>❌ Application Failed to Load</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <details style="margin: 20px 0; text-align: left;">
          <summary>Technical Details</summary>
          <pre style="background: #f8f8f8; padding: 10px; overflow: auto; border-radius: 4px;">${error.stack}</pre>
        </details>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload Application
        </button>
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          This version runs without Redux Persist to isolate the issue.
        </p>
      </div>
    `;
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
