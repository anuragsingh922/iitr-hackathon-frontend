import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import { Box, Button, Drawer, Typography, styled } from "@mui/material";
import { useZustandStore } from "../../store/store";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const NavButton = styled(Button)(() => ({
  background: "white",
  color: "black",
  padding: "5px 20px",
  fontSize: "17px",
  fontWeight: "600",
  border: "none",
  borderRadius: "4px",
  outline: "none",
  cursor: "pointer",
  border: "none",
  boxShadow: "none",
}));

const NavBar = () => {
  const navigate = useNavigate();
  const isSignedIn = localStorage.getItem("jwtToken");
  const { user, setUser } = useZustandStore();
  const matches = useMediaQuery("(max-width:900px)");
  const handleSignout = () => {
    localStorage.removeItem("jwtToken");
    setUser({});
    toast.success("Signed out successfully!", { duration: 2000 });
    navigate("/");
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignup = () => {
    navigate("/getInvite");
  };

  const [state, setState] = useState(false);

  const toggleDrawer = () => {
    setState(!state);
  };

  const list = () => (
    <Box
      sx={{
        width: 250,
        position: "relative",
      }}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <Box
        sx={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            height: "auto",
            width: "50px",
            marginTop: "20px",
            paddingLeft: "18px",
          }}
          src={logo}
          alt="Logo-img"
        />
        <Box
          component="ul"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
            paddingLeft: "25px",
            fontWeight: "700",
            cursor: "pointer",
            listStyleType: "none",
            width: "200px",
          }}
        >
          <Box component="li" onClick={() => navigate("/")}>
            Home
          </Box>
          {/* <Box component="li">Research</Box> */}
          {/* <Box component="li">Product</Box> */}
          {/* <Box component="li">Company</Box> */}
          <NavButton
            variant="contained"
            onClick={handleSignup}
            sx={{ background: "black", color: "white", pr: "20px" }}
          >
            Get an Invite
          </NavButton>
        </Box>
      </Box>
    </Box>
  );

  if (matches) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            top: 0,
            py: 2,
            zIndex: "1",
            background: "black",
            position: "sticky",
            top: 0,
          }}
        >
          <Box
            onClick={() => {
              navigate("/");
            }}
            sx={{ cursor: "pointer" }}
          >
            <img src={logo} alt="LOGO" style={{ width: "20px" }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <MenuIcon
              onClick={toggleDrawer}
              sx={{ fill: "white", cursor: "pointer" }}
            />
          </Box>
          <Drawer anchor={"left"} open={state}>
            {list()}
          </Drawer>
        </Box>
      </>
    );
  }

  return (
    <Box
      sx={{
        background: "black",
        display: "flex",
        justifyContent: "space-between",
        py: "5px",
        px: 2,
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="" style={{ width: "24px" , marginTop : "0px"}} />
          <Typography sx={{ color: "white", fontSize: "2rem" }}>Ivy</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            gap: 3,
            color: "white",
            pl: 5,
            mt: "5px",
          }}
        >
          {/* <Typography sx={{ cursor: "pointer" }}>Research</Typography> */}
          {/* <Typography sx={{ cursor: "pointer" }}>Product</Typography> */}
          {/* <Typography sx={{ cursor: "pointer" }}>Company</Typography> */}
        </Box>
      </Box>
      {isSignedIn ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            sx={{ color: "white", fontSize: "1.2rem", fontWeight: "600" }}
          >
            {user?.name?.split(" ")[0]}
          </Typography>
          <NavButton variant="contained" onClick={handleSignout}>
            Sign Out
          </NavButton>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavButton variant="contained" onClick={handleSignin}>
            Sign In
          </NavButton>
          <NavButton variant="contained" onClick={handleSignup}>
            Get an Invite
          </NavButton>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
