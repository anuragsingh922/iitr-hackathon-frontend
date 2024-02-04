import { useState } from "react";
import Dashboard from "../components/Dashboard";
import classes from "../css/file.module.css";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { useZustandStore } from "../store/store";

const File = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const nav = useNavigate();
  const [pauseBtn, setPauseBtn] = useState(false);
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
  const [btn, setBtn] = useState(false);
  const [data, setData] = useState();
  const [stats, setStats] = useState(statsData);
  const jwtToken = JSON.parse(localStorage.getItem("jwtToken"));
  const { user } = useZustandStore();
  const socket = new WebSocket(
    `ws://${process.env.REACT_APP_BACKEND_WS}/ws/${id}`
  );
  useEffect(() => {
    if (!jwtToken) {
      nav("/");
    }
  }, [jwtToken]);

  const fetch = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/campaign/get`,
        { id }
      );
      setData(data.clients);
      setBtn(data.callBtn);
      setPauseBtn(data.pauseBtn);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickButton = async () => {
    if (!user.phoneNumber) {
      toast.error("Please contact admin to assign you a number");
      return;
    }
    let dataa = [...data];
    if (data && data.length) {
      // try {
      //   dataa.forEach((item, i) => {
      //     item.Status = "Pending";
      //     item.duration = 0;
      //     item.typee = "";
      //     item.recordingUrl = "";
      //     item.chat = "";
      //   });
      //   setData(dataa);
      //   await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/new-call`, {
      //     id,
      //   });
      //   toast.success("Data Cleaned");
      // } catch (error) {
      //   console.log(error);
      //   toast.error("Data Cleaning Error");
      //   setBtn(true);
      //   return;
      // }
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/vonage/voice/handleCalls/${id}/+${user.phoneNumber}/${user.email}`,
        data
      );
    } else {
      toast.error("Unable to call, Thats all we know :(", { duration: 10000 });
    }
  };

  useEffect(() => {
    socket.onopen = () => {
      console.log("WebSocket connected");
    };
  }, []);

  useEffect(() => {
    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.type === "makeCallsBtn") {
        setBtn(parsedData.status);
      }
      if (parsedData.type === "pauseCallsBtn") {
        setPauseBtn(parsedData.status);
      }
      if (data && parsedData.type === "status") {
        const updatedData = [...data];
        for (const dataa of updatedData) {
          if (dataa.id === parsedData.id) {
            if (dataa.Status !== parsedData.status) {
              dataa.Status = parsedData.status;
              fetchStats();
            }
          }
        }
        setData(updatedData);
      }
      if (data && parsedData.type === "timing") {
        const updatedData = [...data];
        for (const dataa of updatedData) {
          if (dataa.id === parsedData.id) {
            dataa.typee = parsedData.response;
            dataa.duration = parsedData.time;
          }
        }
        const updatedStats = [...stats];

        if (parsedData.response === "Human") {
          updatedStats[4].value += 1;
          updatedStats[4].duration += parsedData.time;
        }

        if (
          parsedData.response === "Voicemail" ||
          parsedData.response === "IVR"
        ) {
          updatedStats[5].value += 1;
          updatedStats[5].duration += parsedData.time;
        }
        if (parsedData.response === "Unresponded") {
          updatedStats[12].value += 1;
          updatedStats[12].duration += parsedData.time;
        }
        setData(updatedData);
        setStats(updatedStats);
      }
      if (data && parsedData.type === "recording") {
        const updatedData = [...data];
        for (const dataa of updatedData) {
          if (dataa.id === parsedData.id) {
            dataa.recordingUrl = "Done";
          }
        }
        setData(updatedData);
      }
    };
  });

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/campaign/stats/${id}`
      );
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
    fetchStats();
  }, []);

  if (!data) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "90vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "black" }} />
      </Box>
    );
  }

  const columns = [
    {
      field: "Name",
      headerName: "Full Name",
      width: 130,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 170,
    },
    {
      field: "Number",
      headerName: "Number",
      width: 130,
    },
    {
      field: "Customer_Address",
      headerName: "Customer Address",
      width: 300,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "typee",
      headerName: "Type",
      width: 120,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 100,
    },
    {
      field: "recordingUrl",
      headerName: "Recording",
      width: 100,
    },
  ];

  const columnsWithDash = columns.map((item) => {
    return {
      ...item,
      renderCell: (params) => (
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {params?.field === "recordingUrl"
            ? params?.value !== ""
              ? "Done"
              : "Not Done"
            : params.field.toLowerCase().includes("duration")
            ? `${params?.value?.toFixed(2)}s`
            : params?.value === 0
            ? 0
            : params?.value || "-"}
        </Box>
      ),
    };
  });

  const handlePause = () => {
    const messageData = JSON.stringify({
      id,
      type: "callPause",
    });
    socket.send(messageData);
  };

  return (
    <>
      <Dashboard stats={stats} />
      {data ? (
        <div
          className={classes.tableResponsive}
          style={{ position: "relative" }}
        >
          {/* <Button
            variant="contained"
            sx={{
              position: "absolute",
              top: 14,
              right: 1,
              background: "black",
              color: "white",
            }}
            // onClick={async()=>{
            //     await axios.post()
            // }}
          >
            Reset calls
          </Button> */}
          {btn && (
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                top: 54,
                right: 1,
                background: "black",
                color: "white",
              }}
              onClick={handleClickButton}
            >
              Start calls
            </Button>
          )}
          {pauseBtn && (
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                top: 54,
                right: 1,
                background: "black",
                color: "white",
              }}
              onClick={handlePause}
            >
              Pause calls
            </Button>
          )}

          <h1 className={classes.view}>View Data</h1>
          <DataGrid
            onRowClick={(e) => {
              nav(`/user-data/${e.id}`);
            }}
            rows={data}
            getRowHeight={() => "auto"}
            columns={columnsWithDash}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            sx={{ "& .MuiDataGrid-cell--withRenderer": { py: "15px" } }}
          />
        </div>
      ) : (
        <div className={classes.tableResponsive}>
          <h1 className={classes.nodata}>No Data Found!</h1>
        </div>
      )}
    </>
  );
};

export default File;
