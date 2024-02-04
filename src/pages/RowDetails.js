import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ReactAudioPlayer from "react-audio-player";
import { Typography } from "@mui/material";
import Conversation from "../components/Conversation";

const RowDetails = () => {
  const { id, rowId } = useParams();
  const [recordingUrl, setRecordingUrl] = useState();
  const [downloadedUrl, setDownloadedUrl] = useState();
  const [chat, setChat] = useState();
  const nav = useNavigate();
  let times = 0;

  const fetchRow = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/campaign/get-calldata/${rowId}`
      );
      // if (!data.recordingUrl && !data.chat) nav(`/file/${id}`);
      setRecordingUrl(data.recordingUrl);

      const messages = data.chat.split(/\n(?=[a-zA-Z]+:)/).map((message) => {
        const [sender, content] = message.split(": ");
        return { sender, content };
      });
      setChat(messages);
    } catch (error) {
      console.log(error);
    }
  };

  const download = async () => {
    try {
      const headers = {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTgwMzk5OTYsImV4cCI6MjU2MjAzOTk5NiwianRpIjoieUVQWEFtRWpTdnVTIiwiYXBwbGljYXRpb25faWQiOiIzMzc2ZTIyOS00N2E3LTQ4YzAtOGMyZC0wZjAxYjM1ZTQ3OTAiLCJzdWIiOiIiLCJhY2wiOiIifQ.IVWQIGSn2rl9_AXJHg7WBtRvQUYlgPNoc49g3ddwmUv234LnE5QdcjFsk8bfeE6kTxrtotN_fN5p2q3HoqUEUqCXu6u-00BB8nvnkeLXwr2cXu1Nu6HHr_ocApuHcLBjI57rwyb9QewtjWn5WzY7waJGSNu4G0F_LbTBfriHk_zU9NcmN88LrVypXbhkZOgObcpTMlkf1xu82eezokuoDQWw0R_fLOL9H_aoa6ro-LKLNdJFT3zxB5OFZupYJO0_PsTH10cuHJc1YvHAPMdu5MrmsTGIw4wzWwFgI9okaDqknvp89zrwCnpnMshsvt-MKVmXy-gNOkTRzxCLV-PmMg`,
      };

      const response = await axios.get(recordingUrl, {
        headers,
        responseType: "arraybuffer",
      });
      if (
        response.data === undefined ||
        !response ||
        !response.data ||
        response.data === null
      ) {
        download();
      }
      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: "audio/mpeg", // Adjust the type based on the audio format
      });

      // Create an object URL
      const url = URL.createObjectURL(blob);
      setDownloadedUrl(url);
    } catch (error) {
      // download();
      console.log(error);
      if (error.config.data === undefined) {
        if (times < 2) {
          download();
          times++;
        }
      }
    }
  };

  useEffect(() => {
    fetchRow();
  }, []);

  useEffect(() => {
    if (recordingUrl) {
      download();
    }
  }, [recordingUrl]);

  return (
    <Box
      sx={{
        pt: 4,
        px: 3,
        display: "flex",
        justifyContent: "center",
        flexDirection: ["column", "column", "row"],
      }}
    >
      {downloadedUrl ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" gutterBottom sx={{ pl: 1 }}>
            Recording
          </Typography>
          <ReactAudioPlayer src={downloadedUrl} controls />
        </Box>
      ) : (
        <Box
          sx={{
            minWidth: 300,
            display: "flex",
            maxHeight: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ color: "black" }} />
        </Box>
      )}
      {chat && (
        <Box sx={{ pl: [0, 0, 1], mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Chat History
          </Typography>
          <Conversation messages={chat} />
        </Box>
      )}
    </Box>
  );
};

export default RowDetails;
