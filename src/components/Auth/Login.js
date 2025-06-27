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
import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction"; // Import the doLogin action

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogin = async () => {
    //validate

    //submit api
    let data = await postLogin(email, password);
    if (data && +data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      navigate("/");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
    // console.log(">>check login: ", data);
  };
  const navigate = useNavigate();
  return (
    <div className="login-container ">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => handleRegister()}>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">Nguyen Vu Coder</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <span
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <span className="forgot-password">Forgot password</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Login
          </button>
        </div>
        <div className="back text-center">
          <span
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            &#60;&#60; Go Back Home
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
