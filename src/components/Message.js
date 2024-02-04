// Message.js
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Message = ({ content, sender }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "10px",
        marginBlock: "10px",
        backgroundColor: sender === "user" ? "#f0f0f0" : "black",
        color: sender === "user" ? "#000" : "#fff",
        maxWidth: "500px",
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body1">{sender}: </Typography>
        <Typography variant="body1">{content}</Typography>
      </Box>
    </Paper>
  );
};

export default Message;
