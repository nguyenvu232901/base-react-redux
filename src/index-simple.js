import ReactDOM from 'react-dom/client';
import React from 'react';

// Simple test component
const SimpleApp = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>🎉 React App is Working!</h1>
      <p>This is a simplified version to test if React loads correctly.</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      
      <div style={{ 
        background: '#f0f8ff', 
        padding: '15px', 
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3>✅ Tests Passed:</h3>
        <ul>
          <li>React DOM rendering</li>
          <li>JavaScript execution</li>
          <li>CSS styling</li>
          <li>Component lifecycle</li>
        </ul>
      </div>
      
      <div style={{ 
        background: '#fff3cd', 
        padding: '15px', 
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3>🔧 Next Steps:</h3>
        <p>If you see this page, the basic React setup is working. 
           The issue might be with Redux, Router, or other complex components.</p>
      </div>
      
      <button 
        onClick={() => alert('Button click works!')}
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Click Event
      </button>
    </div>
  );
};

// Error boundary for this simple app
class SimpleErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Simple app error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>❌ Error in Simple App</h1>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize the simple app
try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <SimpleErrorBoundary>
      <SimpleApp />
    </SimpleErrorBoundary>
  );
  console.log('✅ Simple React app rendered successfully');
} catch (error) {
  console.error('❌ Failed to render simple React app:', error);
  
  // Fallback: render error message directly to DOM
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
        <h1>❌ React Initialization Failed</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <p><strong>Stack:</strong></p>
        <pre style="background: #f8f8f8; padding: 10px; overflow: auto;">${error.stack}</pre>
        <button onclick="window.location.reload()">Reload Page</button>
      </div>
    `;
  }
}
