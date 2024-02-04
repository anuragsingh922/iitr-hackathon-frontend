import Login from "./pages/SignIn.js";
import GetInvite from "./pages/GetInvite.js";
import SignUp from "./pages/SignUp.js";
import Failure from "./components/UI/Failure.js";
import Home from "./pages/Home.js";
import File from "./pages/File.js";
import Landing from "./pages/Landing.js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Success from "./pages/Success.js";
import Cancel from "./pages/Cancel.js";
import Check from "./components/Check.js";
import RowDetails from "./pages/RowDetails.js";
import { useEffect } from "react";
import Userdata from "./pages/Userdata.js";
import { useZustandStore } from "./store/store.js";
import axios from "axios";
import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";

const App = () => {
  const jwtToken = JSON.parse(localStorage.getItem("jwtToken"));
  const { setExcelData, setUser } = useZustandStore();
  const [loading, setLoading] = useState(true);

  const fetchCampaign = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/campaign/fetch`,
        { token: jwtToken.token }
      );
      data.reverse();
      setExcelData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const verifyToken = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/verify`,
        { token: jwtToken.token }
      );
      const { status, user } = data;

      setUser(user);
      await fetchCampaign();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          minHeight: "97vh",
        }}
      >
        <CircularProgress size={60} sx={{ color: "black" }} />
      </Box>
    );
  }

  const currentUrl = window.location.href;

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Check />}>
            <Route path="/" element={<Landing />} />
            <Route path="/campaign" element={<Home />} />
            <Route path="/file/:id" element={<File />} />
            <Route path="/file/:id/admin" element={<File />} />
            <Route path="/details/:id/:rowId" element={<RowDetails />} />
            <Route path="/user-data/:id/" element={<Userdata />} />
            <Route path="/signin" element={<Login />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}
            <Route path="/getInvite" element={<GetInvite />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/*" element={<Failure />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
