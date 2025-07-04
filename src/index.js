import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import 'nprogress/nprogress.css';
import Layout from './Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Debug logging
// eslint-disable-next-line no-console
console.log('🚀 Starting React app (NO PERSIST) initialization...');
// eslint-disable-next-line no-console
console.log('📦 Store:', store);
// eslint-disable-next-line no-console
console.log('🌍 Environment:', process.env.NODE_ENV);
// eslint-disable-next-line no-console
console.log('📍 Current URL:', window.location.href);

try {
  // eslint-disable-next-line no-console
  console.log('🎯 Creating React root...');
  const root = ReactDOM.createRoot(document.getElementById('root'));

  // eslint-disable-next-line no-console
  console.log('🎨 Rendering app (without persist)...');
  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );

  // eslint-disable-next-line no-console
  console.log('✅ App render completed successfully (no persist)');
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
