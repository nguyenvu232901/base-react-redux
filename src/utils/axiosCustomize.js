import axios from "axios";
import NProgress from "nprogress"; // Import NProgress for loading indicator

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
const instance = axios.create({
  baseURL: "http://localhost:8081/",
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
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(">>> run error", error.response);
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
