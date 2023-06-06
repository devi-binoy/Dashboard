import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList, faHome } from "@fortawesome/free-solid-svg-icons";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const mcDataObject = JSON.parse(localStorage.getItem("MCData"));
const firstName = mcDataObject?.first_name;

function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleIconClick = () => {
    if (location.pathname === "/dashboard/accounts") {
      navigate("/dashboard");
    } else {
      navigate("/dashboard/accounts");
    }
  };

  const getStatusIcon = () => {
    if (location.pathname === "/dashboard/accounts") {
      return (
        <FontAwesomeIcon
          icon={faHome}
          style={{ color: "#FCFFF9", height: "1.25rem" }}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faTableList}
          style={{ color: "#FCFFF9", height: "1.25rem" }}
        />
      );
    }
  };

  return (
      <AppBar
        position="static"
        className="navbar"
        sx={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#639C8E",
          marginTop: "-0.5rem",
          marginLeft: 0,
          marginRight: 0,
          justifyContent: "space-between",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={handleIconClick}>
            {getStatusIcon()}
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            {props.name}
          </Typography>
          <Typography variant="h6" component="div">
            Hi, {firstName}!
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar;
