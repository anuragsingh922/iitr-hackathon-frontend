import { useNavigate } from "react-router-dom";
import "../css/log.css";

const GetInvite = () => {
  const navigate = useNavigate();

  return (
    <div className="main reg">
      <div className="log regi">
        <h1 className="head1">Get an Invite!</h1>
        <button className="button">
          <a href="https://calendly.com/paul1506/ivy" className="getLink">
            Lets Discuss
          </a>
        </button>
        {/* <div className="or">
          Already have an account?
          <span onClick={() => navigate("/signin")} className="alt">
            Sign in
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default GetInvite;
