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

// Debug logging
// eslint-disable-next-line no-console
console.log('🚀 Starting React app with persist fallback...');
// eslint-disable-next-line no-console
console.log('📦 Store:', store);
// eslint-disable-next-line no-console
console.log('💾 Persistor:', persistor);

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
    console.log('🔄 User chose to skip persist - reloading without persist...');
    
    // Clear localStorage and reload with no-persist version
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
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      background: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h2>🔄 Loading Application...</h2>
      <p>Initializing Redux store and persisted state...</p>
      
      <div style={{ marginTop: '20px' }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
      
      {showFallback && (
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: '#fff3cd', 
          borderRadius: '8px',
          border: '1px solid #ffeaa7'
        }}>
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
              fontWeight: 'bold'
            }}
          >
            🔄 Clear Data & Continue
          </button>
          <p style={{ fontSize: '12px', marginTop: '10px', color: '#856404' }}>
            This will clear saved preferences but allow the app to load normally.
          </p>
        </div>
      )}
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
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
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload Application
        </button>
      </div>
    `;
  }
}

reportWebVitals();
