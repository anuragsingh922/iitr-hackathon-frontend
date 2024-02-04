import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid, styled } from "@mui/material";
import womanImage from "../assets/women.png";
import aiImage from "../assets/ai.jpg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SouthIcon from "@mui/icons-material/South";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import useMediaQuery from "@mui/material/useMediaQuery";

const LandingContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f5f5f5", // Background color
  mt: 4,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  padding: 20,
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  background: "white",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
}));

const PriceSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  background: "white",
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  justifyContent: "space-between",
}));

const Landing = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwtToken");
  const matches = useMediaQuery("(max-width:900px)");

  const features = [
    {
      title: "Easy set up",
      description:
        "In just a few clicks, ivy becomes an expert on your business 10x faster than you can hire and train someone.",
    },
    {
      title: "No more missed calls",
      description:
        "Ivy answers phone calls 24/7, and it can take multiple calls at the same time without breaking a sweat.",
    },
    {
      title: "Stay in control",
      description:
        "Fallback calls to a human, forward calls to other lines, set up custom routing rules, or just turn ivy off on-demand.",
    },

    {
      title: "Integrate on your website",
      description:
        "Ivy plugs in on your website and talk to your incoming leads or customers 24/7",
    },
    {
      title: "Human like Voices",
      description:
        "We are obsessed with sounding Ivy just like a real human. During our initial pilots customers couldn’t differentiate between Ivy and a real human",
    },
  ];

  const pricePlans = [
    {
      title: "Basic Plan",
      price: "$49.99/month",
      points: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    },
    {
      title: "Pro Plan",
      price: "$99.99/month",
      points: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    },
    {
      title: "Enterprise Plan",
      price: "Contact us for pricing",
      points: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    },
  ];

  useEffect(() => {
    if (jwt) {
      navigate("/campaign");
    }
  }, [jwt, navigate]);

  return (
    <>
      <LandingContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexDirection: ["column", "column", "row"],
            justifyContent: "center",
            width: ["auto", "auto", "1000px"],
            margin: "auto",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: ["auto", "auto", "500px"],
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              my: 8,
            }}
          >
            <Typography variant="h2">Meet Ivy</Typography>

            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ marginTop: 2 }}
            >
              Ivy is a super smart AI assistant. She can make phone calls or can
              voice chat on your website. She can hold long conversations with
              people and sound like a real person. She never forgets anything
              and can remember everything perfectly. Ivy is so good that it can
              do a job without needing any training, supervision, or rewards,
              just like a full-time worker. And the best part is, she works all
              the time, every day. You can even give Ivy documents like Excel
              files, CSV files, or PDFs, and she will understand them.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                marginTop: 3,
                background: "rgb(29, 41, 57)",
                color: "white",
              }}
              onClick={() => {
                window.location.href = "https://calendly.com/paul1506/ivy";
              }}
            >
              Schedule a free demo
            </Button>
          </Box>
          <Box sx={{ width: ["300px", "300px", "400px"], height: "400px" }}>
            <img src={aiImage} alt="Woman" style={{ width: "100%" }} />
          </Box>
        </Box>
        <Box
          sx={{
            mt: 4,
            padding: [2, 2, 4],
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            borderBottom="1px solid"
            width="fit-content"
          >
            Features
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: [
                "repeat(1,1fr)",
                "repeat(2,1fr)",
                "repeat(3,1fr)",
              ],
            }}
          >
            {features.map((feature, index) => (
              <FeatureBox key={index}>
                <Typography variant="h6">{feature.title}</Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </FeatureBox>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            width: "98%",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Usage based Pricing
          </Typography>
          {/* <Typography variant="subtitle2" gutterBottom sx={{ mb: 3 }}>
            Our competitors charge you per minute, but we don't.
          </Typography> */}
          {/* <Box
            sx={{
              mt: 2,
              display: "grid",
              gap: 4,
              gridTemplateColumns: [
                "repeat(1,1fr)",
                "repeat(2,1fr)",
                "repeat(3,1fr)",
              ],
            }}
          >
            {pricePlans.map((plan, index) => (
              <PriceSection key={index}>
                <Typography variant="h5">{plan.title}</Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ marginTop: 2, mb: 2 }}
                >
                  {plan.price}
                </Typography>
                {plan.points.map((point, pointIndex) => (
                  <Box
                    key={pointIndex}
                    sx={{
                      display: "flex",
                      mb: 1,
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ fill: "green", fontSize: "1.1rem" }}
                    />
                    <Typography variant="body1">{point}</Typography>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    marginTop: 3,
                    background: "rgb(29, 41, 57)",
                    color: "white",
                  }}
                >
                  Get Started
                </Button>
              </PriceSection>
            ))}
          </Box> */}
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#ffffff",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              border: "1px solid #6B7280",
              borderRadius: "8px",
              justifyContent: "space-between",
              px: [2, 2, 3],
              gap: [4, 4, 2],
              py: 4,
              alignItems: "center",
              flexDirection: ["column", "column", "row"],
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "medium",
                width: ["90%", "90%", "50%"],
              }}
            >
              Don't worry about getting into price commitments. No upfront or
              set up fees. Pay per minutes of actual conversations, to start
              with. Later switch to attractive pricing based on your usage
            </Typography>
            <Button
              variant="contained"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                borderRadius: "8px",
                color: "white",
                fontSize: "1rem",
                backgroundColor: "Black",
                p: "0.5rem 1rem",
                // height: "30px",
              }}
              onClick={() => {
                window.location.href = "https://calendly.com/paul1506/ivy";
              }}
            >
              Get an Invite
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "98%", mt: 8 }}>
          <Paper
            elevation={3}
            sx={{
              padding: "26px",
              px: 5,
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
              pb: 7,
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ mt: 4 }}>
                Turn sentences into sales
              </Typography>
              <Typography color="textSecondary">
                Tell Ivy about your business and she'll do the rest.
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexDirection: ["column", "column", "row"],
                }}
              >
                <Box
                  sx={{
                    border: "1px solid #888",
                    borderRadius: "999px",
                    padding: "8px 24px",
                    display: "flex",
                    alignItems: "center",
                    flex: "1",
                  }}
                >
                  We at Joe's Sports have a BOGO on mens casual shoes
                </Box>
                {matches ? <SouthIcon /> : <ArrowRightAltIcon />}

                <Box
                  sx={{
                    padding: "16px",
                    border: "1px solid #7a7a7a",
                    flex: "1",
                    mt: [0, 0, 8],
                  }}
                >
                  <Typography>
                    Hi, thanks for calling{" "}
                    <span style={{ textDecoration: "underline" }}>
                      Joe's Sports
                    </span>
                    ! We're having a sale on{" "}
                    <span style={{ textDecoration: "underline" }}>
                      men's casual shoes
                    </span>{" "}
                    right now,{" "}
                    <span style={{ textDecoration: "underline" }}>
                      buy one, get one free
                    </span>
                    . Would you like to hear more about it?
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </LandingContainer>
    </>
  );
};

export default Landing;
