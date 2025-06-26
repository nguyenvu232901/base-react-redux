import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiServices";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    //validate

    //submit api
    let data = await postRegister(email, username, password);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
    // console.log(">>check login: ", data);
  };
  const navigate = useNavigate();
  return (
    <div className="login-container ">
      {/* <div className="header">
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
      </div> */}
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
          <label htmlFor="username">username</label>
          <input
            type={"username"}
            className="form-control"
            value={username}
            onChange={(e) => setusername(e.target.value)}
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
        <div>
          <button className="btn-submit" onClick={() => handleRegister()}>
            Register
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

export default Register;
