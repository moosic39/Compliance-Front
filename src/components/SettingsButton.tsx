import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

function SettingsButton() {
  const username = window.location.pathname.split("/")[2];
  return (
    <Link to={`/settings/${username}`}>
      <Button endIcon={<SettingsRoundedIcon />}></Button>
    </Link>
  );
}

export default SettingsButton;
