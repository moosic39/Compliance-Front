import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function SettingsButton() {
  const username = window.location.pathname.split("/")[2];
  return (
    <Link to={`/settings/${username}`}>
      <Button>Setting</Button>
    </Link>
  );
}

export default SettingsButton;
