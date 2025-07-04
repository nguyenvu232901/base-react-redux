import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import 'nprogress/nprogress.css';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './Layout';
import ErrorBoundary from './components/ErrorBoundary';


// Debug logging
// eslint-disable-next-line no-console
console.log('🚀 Starting React app initialization...');
// eslint-disable-next-line no-console
console.log('📦 Store:', store);
// eslint-disable-next-line no-console
console.log('💾 Persistor:', persistor);
// eslint-disable-next-line no-console
console.log('🌍 Environment:', process.env.NODE_ENV);
// eslint-disable-next-line no-console
console.log('📍 Current URL:', window.location.href);

// Enhanced loading component with debug info
const LoadingComponent = () => {
  // eslint-disable-next-line no-console
  console.log('⏳ PersistGate is loading...');
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
      <div style={{ marginTop: '20px' }}>
        <div
          style={{
            width: '50px',
            height: '50px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
      </style>
    </div>
  );
};

try {
  // eslint-disable-next-line no-console
  console.log('🎯 Creating React root...');
  const root = ReactDOM.createRoot(document.getElementById('root'));

  // eslint-disable-next-line no-console
  console.log('🎨 Rendering app...');
  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<LoadingComponent />} persistor={persistor}>
          {/* <React.StrictMode> */}
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
          {/* </React.StrictMode> */}
        </PersistGate>
      </Provider>
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
          If this error persists, please check the browser console for more details.
        </p>
      </div>
    `;
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
