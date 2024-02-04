import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "../css/log.css";
import { useZustandStore } from "../store/store";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useZustandStore();
  const [user, setUserr] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserr({
      ...user,
      [name]: value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    document.getElementById("SignUpButton").innerHTML = "Signing up...";
    user.email = user.email.toLowerCase();

    if (user.password === user.reEnterPassword) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, user)
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem(
              "jwtToken",
              JSON.stringify({ token: res.data.token })
            );
            setUser(res.data.user);
            toast.success(res.data.message, { duration: 2000 });
            navigate("/campaign");
          } else {
            toast.error(res.data.message, { duration: 2000 });
          }
          document.getElementById("SignUpButton").innerHTML = "Sign up";
        })
        .catch((err) => {
          document.getElementById("SignUpButton").innerHTML = "Sign up";
          toast.error("Something went wrong. Try again later!", {
            duration: 2000,
          });
          console.log(err);
        });
    } else {
      document.getElementById("SignUpButton").innerHTML = "Sign up";
      toast.error("Invalid Input!", { duration: 2000 });
    }
  };

  return (
    <div className="main reg">
      <div className="log regi">
        <h1 className="head1">Create your account!</h1>
        <form action="" onSubmit={(e) => register(e)}>
          <input
            type="text"
            name="name"
            value={user.name}
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleChange}
            minLength={8}
            required
          />
          <input
            type="password"
            name="reEnterPassword"
            value={user.reEnterPassword}
            placeholder="Re-enter Password"
            onChange={handleChange}
            minLength={8}
            required
          />

          <button className="button" id="SignUpButton">
            Sign up
          </button>
        </form>
        <div className="or">
          Already have an account?
          <span onClick={() => navigate("/signin")} className="alt">
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
