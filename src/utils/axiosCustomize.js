import axios from 'axios';
import NProgress from 'nprogress'; // Import NProgress for loading indicator

NProgress.configure({
  showSpinner: false,
  // easing: "ease",
  // speed: 500,
  // trickleRate: 0.5,
  // easing: "ease",
  // speed: 200,
  // trick: true,
  // trickleRate: 0.5,
  trickleSpeed: 100,
});
// Get API base URL from environment variables
const getApiBaseUrl = () => {
  // Use environment variable if available, fallback to localhost for development
  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://backend-api-puh1.onrender.com';

  // Ensure URL ends with slash
  const finalUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  // Debug logging
  // eslint-disable-next-line no-console
  console.log('🌐 API Base URL:', finalUrl);
  // eslint-disable-next-line no-console
  console.log('🔧 Environment:', process.env.NODE_ENV);
  // eslint-disable-next-line no-console
  console.log('📱 User Agent:', navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop');
  // eslint-disable-next-line no-console
  console.log('🌍 Current URL:', window.location.href);

  return finalUrl;
};

const instance = axios.create({
  baseURL: getApiBaseUrl(),
  //   timeout: 1000,
  //   headers: { "X-Customize-Header": "foobar" },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    NProgress.start(); // Start the loading indicator
    // Do something before request is sent
    return config;
  },
  function (error) {
    NProgress.start(); // Start the loading indicator

    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done(); // Stop the loading indicator
    // console.log(">>> interceptor", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    NProgress.done(); // Stop the loading indicator

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log('>>> run error', error.response);
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
