import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { v1 } from "uuid";

import classes from "../css/home.module.css";
import Campaigns from "../components/Campaigns";
import Modal from "../components/UI/Modal";
import Dashboard from "../components/Dashboard";
import { loadStripe } from "@stripe/stripe-js";
import { useZustandStore } from "../store/store";
import { Box, CircularProgress } from "@mui/material";

const Home = (props) => {
  const navigate = useNavigate();
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [vis, setVis] = useState(false);
  const [inputState, setInputState] = useState({});
  const [fileName, setFileName] = useState("");
  const jwtToken = JSON.parse(localStorage.getItem("jwtToken"));
  const [loading, setLoading] = useState(true);
  const { excelData, setExcelData, campaigns, setCampaigns } =
    useZustandStore();
  const statsData = [
    { content: "Calls Made", value: 0 },
    { content: "Pending", value: 0 },
    { content: "Ringing", value: 0 },
    { content: "Answered", value: 0 },
    { content: "Human", value: 0, duration: 0 },
    { content: "Machine/IVR", value: 0, duration: 0 },
    { content: "Unanswered", value: 0 },
    { content: "Timeout", value: 0 },
    { content: "Failed", value: 0 },
    { content: "Cancelled", value: 0 },
    { content: "Busy", value: 0 },
    { content: "Error", value: 0 },
    { content: "Unresponded", value: 0, duration: 0 },
  ];

  const [stats, setStats] = useState(statsData);

  const fetchCampaign = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/campaign/fetch`,
        { token: jwtToken.token }
      );
      data.reverse();
      setExcelData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (excelFile != null) {
      setCampaigns([{ name: fileName }, ...campaigns]);

      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const data1 = [];
      data.map((fileData) => {
        if (
          fileData["Phone number"] &&
          fileData["Client Email"] &&
          fileData["First Name"] &&
          fileData["Physical Address"] &&
          fileData["Carrier "]
        ) {
          const id = v1();
          let tempData = {
            Name: fileData["First Name"] || "",
            Email: fileData["Client Email"] || "",
            Customer_Address: fileData["Physical Address"] || "",
            Number: fileData["Phone number"] || "",
            id: id,
            plan_name: fileData["Carrier "] || "",
            Status: "Pending",
            typee: "",
            duration: 0,
            timesCalled: 0,
            recordingUrl: "",
            chat: "",
            time_zone1: fileData["time_zone1"] || "",
            time_zone2: fileData["time_zone2"] || "",
            callBtn: true,
            callsMade: 0,
            callsPause: false,
            pauseBtn: false,
          };
          if (fileData["PLan summary of benefit URL"]) {
            tempData.plan_url = fileData["PLan summary of benefit URL"];
          }
          data1.push(tempData);
        }
      });
      const createdAt = new Date(Date.now()).toDateString();

      // await axios
      //   .post(`${process.env.REACT_APP_BACKEND_URL}/campaign/save`, {
      //     name: fileName,
      //     date: createdAt,
      //     token: jwtToken.token,
      //     callBtn: true,
      //     callsMade: 0,
      //     callsPause: false,
      //     pauseBtn: false,
      //     clients: data1,
      //   })
      //   .catch((err) => console.error(err));
      // setFileName("");
    }
  };

  const handleChange = () => {
    let selectedFile = document.getElementById("csvUpload").files[0];
    setInputState(document.getElementById("csvUpload").files[0]);
    let fileType = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    if (selectedFile) {
      if (selectedFile.type) {
        if (fileType.includes(selectedFile.type)) {
          setExcelFile(selectedFile);
          setTypeError(null);

          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = (e) => {
            setExcelFile(e.target.result);
          };
          setVis(true);
        } else {
          setVis(false);
          setTypeError("Please select valid excel sheet!");
        }
        document.getElementById("csvUpload").value = null;
      }
    } else {
      console.log("Please select your file");
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/stripe/create-checkout-session`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    stripe.redirectToCheckout({
      sessionId: data.id,
    });
    if (data.error) {
      console.log(data.error);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/campaign/get-stats`,
        { token: jwtToken.token }
      );
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // toast.error("Unable to fetch");
    }
  };

  useEffect(() => {
    // verifyToken();
    fetchCampaign();
    fetchStats();
  }, []);

  // useEffect(() => {
  //   if (excelData && excelData.length) {
  //     resetData();
  //     calculateValue();
  //   }
  // }, [excelData]);

  return (
    <>
      {!loading ? (
        <Dashboard stats={stats} />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <CircularProgress size={30} sx={{ color: "black" }} />
        </Box>
      )}
      {/* <Button variant="contained" onClick={makePayment}>
        Make Payment
      </Button> */}
      <div className={classes.mainHome}>
        <div className={classes.camp}>
          <h2 className={classes.head1}>Campaigns</h2>
          <label htmlFor="csvUpload" className={classes.new}>
            + New Campaign
          </label>
          <input
            type="file"
            id="csvUpload"
            className={classes.newMain}
            onChange={handleChange}
          />
        </div>
        {vis && (
          <Modal setVis={setVis}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <h4 className={classes.uploadHead}>
                {inputState.name.split(" ").join("").toLowerCase()}
              </h4>
              <input
                className={classes.inp}
                type="text"
                name="fileName"
                value={fileName}
                onChange={(e) => {
                  setFileName(e.target.value);
                }}
                placeholder="Enter campaign name..."
                required
              />
              <button className={classes.upload}>Upload</button>
              <button
                className={classes.cancel}
                onClick={() => {
                  setVis(false);
                }}
              >
                Cancel
              </button>
            </form>
          </Modal>
        )}
        {typeError && <div className={classes.error}>{typeError}</div>}

        {excelData?.map((campaign, index) => {
          return (
            <Campaigns
              title={campaign.name}
              key={index}
              id={campaign._id}
              length={campaign.clients.length || 0}
              date={campaign.date}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
