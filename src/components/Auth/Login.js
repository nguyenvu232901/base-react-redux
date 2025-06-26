import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const handleLogin = async () => {
    //validate

    //submit api
    let data = await postLogin(email, password);
    if (data && +data.EC === 0) {
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
        <button>Sign up</button>
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
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
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
