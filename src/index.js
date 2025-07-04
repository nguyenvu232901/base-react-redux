import ReactDOM from 'react-dom/client';

// Simple test component
const SimpleApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎉 React App is Working!</h1>
      <p>This is a simplified version to test if React loads correctly.</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      <button onClick={() => alert('Button works!')}>Test Button</button>
    </div>
  );
};

// Initialize the simple app
try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<SimpleApp />);
} catch (error) {
  // Fallback: render error message directly to DOM
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
        <h1>❌ React Initialization Failed</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <button onclick="window.location.reload()">Reload Page</button>
      </div>
    `;
  }
}
