import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "../css/log.css";
import { useZustandStore } from "../store/store";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useZustandStore();

  const [user, setUserr] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserr({
      ...user,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    document.getElementById("LoginButton").innerHTML = "Signing in...";
    user.email = user.email.toLowerCase();

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, user)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem(
            "jwtToken",
            JSON.stringify({ token: res.data.token })
          );
          toast.success(res.data.message, { duration: 2000 });
          setUser(res.data.user);
          navigate("/campaign");
        } else {
          toast.error(res.data.message, { duration: 2000 });
        }
        document.getElementById("LoginButton").innerHTML = "Sign in";
      })
      .catch((err) => {
        document.getElementById("LoginButton").innerHTML = "Sign in";
        toast.error("Something went wrong. Try again later!", {
          duration: 2000,
        });
        console.log(err);
      });
  };

  return (
    <div className="main">
      <div className="log">
        <h1 className="head1">Welcome back!</h1>
        <form action="" onSubmit={(e) => login(e)} className="form">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button className="button" id="LoginButton">
            Sign in
          </button>
        </form>
        <div className="or">
          Don't have an account?
          <span onClick={() => navigate("/getInvite")} className="alt">
            Get an Invite
          </span>
          {/* <span onClick={() => navigate("/signup")} className="alt">Sign up</span> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
