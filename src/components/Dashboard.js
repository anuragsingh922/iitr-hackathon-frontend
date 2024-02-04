import { Box, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Dashboard = ({ stats }) => {
  return (
    <Box sx={{ mt: [1, 1, 5], mx: [1, 1, 9] }}>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 1, ml: 1 }}>
        <Typography
          sx={{
            mb: [0, 0, -6],
            textAlign: ["center", "center", "left"],
            fontSize: ["2rem", "2rem"],
            fontWeight: "500",
          }}
        >
          Campaign Stats
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", "column", "row"],
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: "20px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                color: "#63768d",
                fontSize: "1.5rem",
              }}
            >
              {stats[0].value || 0}
            </Typography>
            <Typography sx={{ color: "#a2a6aa" }}>
              {stats[0].content || ""}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ArrowForwardIosIcon
              sx={{ transform: ["rotate(90deg)", "rotate(90deg)", "initial"] }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // borderRight: "3px solid" + stats[2].color,
              px: "20px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                color: "#63768d",
                fontSize: "1.5rem",
              }}
            >
              {stats[2].value || 0}
            </Typography>
            <Typography sx={{ color: "#a2a6aa" }}>
              {stats[2].content || ""}
            </Typography>
          </Box>

          {stats.map(
            (item, i) =>
              i > 5 &&
              item.content !== "Unresponded" && (
                <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
                  {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ArrowForwardIosIcon />
                  </Box> */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      // borderRight: "3px solid" + item.color,
                      px: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "700",
                        color: "#63768d",
                        fontSize: "1.5rem",
                      }}
                    >
                      {item.value || 0}
                    </Typography>
                    <Typography sx={{ color: "#a2a6aa" }}>
                      {item.content || ""}
                    </Typography>
                  </Box>
                </Box>
              )
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: "20px",
              ml: "5px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                color: "#63768d",
                fontSize: "1.5rem",
              }}
            >
              {stats[3].value || 0}
            </Typography>
            <Typography sx={{ color: "#a2a6aa" }}>
              {stats[3].content || ""}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ArrowForwardIosIcon
              sx={{ transform: ["rotate(90deg)", "rotate(90deg)", "initial"] }}
            />
          </Box>
          <Box
            sx={{
              boxShadow: "0px 0px 0px 1px #0000004d",
              display: "flex",
              flexDirection: "column",
              borderRadius: "10px",
              py: "10px",
              ml: 1,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  px: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "700",
                    color: "#63768d",
                    fontSize: "1.5rem",
                  }}
                >
                  {stats[4].value || 0}
                </Typography>
                <Typography sx={{ color: "#a2a6aa" }}>
                  {stats[4].content || ""}
                </Typography>
                <Typography
                  sx={{ color: "black", fontSize: "0.9rem", fontWeight: "700" }}
                >
                  {stats[4].duration?.toFixed(2) || 0}s
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  // borderRight: "3px solid" + stats[2].color,
                  px: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "700",
                    color: "#63768d",
                    fontSize: "1.5rem",
                  }}
                >
                  {stats[5].value || 0}
                </Typography>
                <Typography sx={{ color: "#a2a6aa" }}>
                  {stats[5].content || ""}
                </Typography>
                <Typography
                  sx={{ color: "black", fontSize: "0.9rem", fontWeight: "700" }}
                >
                  {stats[5].duration?.toFixed(2) || 0}s
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: "20px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  color: "#63768d",
                  fontSize: "1.5rem",
                }}
              >
                {stats[12].value || 0}
              </Typography>
              <Typography sx={{ color: "#a2a6aa" }}>
                {stats[12].content || ""}
              </Typography>
              <Typography
                sx={{ color: "black", fontSize: "0.9rem", fontWeight: "700" }}
              >
                {stats[12].duration?.toFixed(2) || 0}s
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            mt: 2,
            justifyContent: ["center", "center", "initial"],
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: "20px",
              ml: "5px",
              mt: [0, 0, -4],
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                color: "#63768d",
                fontSize: "1.5rem",
              }}
            >
              {stats[1].value || 0}
            </Typography>
            <Typography sx={{ color: "#a2a6aa" }}>
              {stats[1].content || ""}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
