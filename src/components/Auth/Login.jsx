// import { useState } from "react";
// import "./Login.scss";
// import { useNavigate } from "react-router-dom";
// import { postLogin } from "../../services/apiServices";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setpassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleRegister = () => {
//     navigate("/register");
//   };
//   const handleLogin = async () => {
//     //validate

//     //submit api
//     let data = await postLogin(email, password);
//     if (data && +data.EC === 0) {
//       toast.success(data.EM);
//       navigate("/");
//     }

//     if (data && +data.EC !== 0) {
//       toast.error(data.EM);
//     }
//     // console.log(">>check login: ", data);
//   };
//   const navigate = useNavigate();
//   return (
//     <div className="login-container ">
//       <div className="header">
//         <span>Don't have an account yet?</span>
//         <button onClick={() => handleRegister()}>Sign up</button>
//       </div>
//       <div className="title col-4 mx-auto">Nguyen Vu Coder</div>
//       <div className="welcome col-4 mx-auto">Hello, who's this?</div>
//       <div className="content-form col-4 mx-auto">
//         <div className="form-group">
//           <label htmlFor="Email">Email</label>
//           <input
//             type={"email"}
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="Password">Password</label>
//           <div style={{ position: "relative" }}>
//             <input
//               type={showPassword ? "text" : "password"}
//               className="form-control"
//               value={password}
//               onChange={(e) => setpassword(e.target.value)}
//             />
//             <span
//               style={{
//                 position: "absolute",
//                 right: 10,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//               }}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//         </div>
//         <span className="forgot-password">Forgot password</span>
//         <div>
//           <button className="btn-submit" onClick={() => handleLogin()}>
//             Login
//           </button>
//         </div>
//         <div className="back text-center">
//           <span
//             onClick={() => {
//               navigate("/");
//             }}
//           >
//             {" "}
//             &#60;&#60; Go Back Home
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

//dùng redux
import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin, postGoogleLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash  } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction'; // Import the doLogin action
import { ImSpinner10 } from 'react-icons/im'; // Import spinner icon
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const handleRegister = () => {
    navigate('/register');
  };
  const handleLogin = async () => {
    //validate
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true); // Set loading state to true
    try {
      //submit api
      const data = await postLogin(email, password);
      if (data && +data.EC === 0) {
        dispatch(doLogin(data));
        toast.success(data.EM);
        setIsLoading(false); // Reset loading state
        navigate('/');
      } else {
        toast.error(data.EM || 'Login failed');
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse, mockDecoded = null) => {
    let decoded = null;

    try {
      setIsLoading(true);

      // Decode the JWT token to get user info (or use mock data)
      decoded = mockDecoded || jwtDecode(credentialResponse.credential);

      // Try backend integration first, fallback to frontend-only
      try {
        const backendResponse = await postGoogleLogin(
          credentialResponse.credential,
          {
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture,
          }
        );

        if (backendResponse && +backendResponse.EC === 0) {
          // Backend successfully created/found user
          dispatch(doLogin(backendResponse));
          toast.success(`Welcome ${decoded.name}! Account synced to database.`);
          setIsLoading(false);
          navigate('/');
          return;
        } else {
          throw new Error(backendResponse.EM || 'Backend login failed');
        }
      } catch (backendError) {
        // eslint-disable-next-line no-console
        console.warn('Backend Google login failed, using mock data for demo:', backendError);

        // Mock backend response for demo (simulates user creation)
        const mockBackendResponse = {
          EC: 0,
          EM: 'Google login successful',
          DT: {
            access_token: `mock_google_token_${Date.now()}`,
            refresh_token: `mock_refresh_token_${Date.now()}`,
            username: decoded.name,
            email: decoded.email,
            image: decoded.picture,
            role: 'USER',
            id: Math.floor(Math.random() * 10000), // Mock user ID
          },
        };

        dispatch(doLogin(mockBackendResponse));
        toast.success(`Welcome ${decoded.name}! (Demo mode - simulated database save)`);
        setIsLoading(false);
        navigate('/');
      }

    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Google login error:', error);
      toast.error('Google login failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Handle Google Login Error
  const handleGoogleError = () => {
    toast.error('Google login was cancelled or failed');
  };
  const navigate = useNavigate();
  return (
    <div className='login-container '>
      <div className='header'>
        <span>Don&apos;t have an account yet?</span>
        <button onClick={() => handleRegister()}>Sign up</button>
      </div>
      <div className='title col-4 mx-auto'>Nguyen Vu Coder</div>
      <div className='welcome col-4 mx-auto'>Hello, who&apos;s this?</div>
      <div className='content-form col-4 mx-auto'>
        <div className='form-group'>
          <label htmlFor='Email'>Email</label>
          <input
            type={'email'}
            className='form-control'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Password'>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              className='form-control'
              value={password}
              onChange={e => setpassword(e.target.value)}
            />
            <span
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => setShowPassword(!showPassword)}
              role='button'
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <span
          className='forgot-password'
          role='button'
          tabIndex={0}
          onClick={() => {
            /* handle forgot password */
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              /* handle forgot password */
            }
          }}
        >
          Forgot password
        </span>
        <div>
          <button className='btn-submit' onClick={() => handleLogin()} disabled={isLoading}>
            {isLoading === true && <ImSpinner10 className='loader-icon' />}
            <span>Login</span>
          </button>
        </div>

        {/* Divider */}
        <div className="login-divider">
          <span>OR</span>
        </div>

        {/* Google Login */}
        <div className="google-login-container">
          {process.env.REACT_APP_MOCK_GOOGLE_AUTH === 'true' ? (
            // Mock Google Login Button for development
            <button
              className="btn btn-outline-primary w-100"
              onClick={() => {
                const mockCredential = {
                  credential: 'mock_jwt_token_' + Date.now(),
                };
                const mockDecoded = {
                  name: 'Test User',
                  email: 'test@gmail.com',
                  picture: 'https://via.placeholder.com/150',
                };

                // Simulate Google login
                handleGoogleSuccess(mockCredential, mockDecoded);
              }}
              disabled={isLoading}
            >
              🔧 Mock Google Login (Development)
            </button>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
              logo_alignment="left"
            />
          )}
        </div>
        <div className='back text-center'>
          <span
            onClick={() => {
              navigate('/');
            }}
            role='button'
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') navigate('/');
            }}
          >
            {' '}
            &#60;&#60; Go Back Home
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
