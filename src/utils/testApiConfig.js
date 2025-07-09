// Test utility to check API configuration
export const testApiConfig = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081';
  const finalUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  // eslint-disable-next-line no-console
  console.log('=== API Configuration Test ===');
  // eslint-disable-next-line no-console
  console.log('🌐 API Base URL:', finalUrl);
  // eslint-disable-next-line no-console
  console.log('🔧 Environment:', process.env.NODE_ENV);
  // eslint-disable-next-line no-console
  console.log('📱 User Agent:', navigator.userAgent);
  // eslint-disable-next-line no-console
  console.log('🌍 Current URL:', window.location.href);

  // Test if URL is accessible
  fetch(finalUrl + 'api/v1/participant/all')
    .then(response => {
      // eslint-disable-next-line no-console
      console.log('✅ API Test Response Status:', response.status);
      return response.json();
    })
    .then(data => {
      // eslint-disable-next-line no-console
      console.log('✅ API Test Data:', data);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error('❌ API Test Failed:', error.message);
      // eslint-disable-next-line no-console
      console.error('💡 Possible issues:');
      // eslint-disable-next-line no-console
      console.error('   - Backend server is not running');
      // eslint-disable-next-line no-console
      console.error('   - CORS not configured properly');
      // eslint-disable-next-line no-console
      console.error('   - Wrong API URL in environment variables');
    });
};

// Auto-run test in development
if (process.env.NODE_ENV === 'development') {
  // Run test after a short delay to ensure app is loaded
  setTimeout(testApiConfig, 2000);
}
