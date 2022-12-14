import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";

function LogoutButton() {
  const navigate = useNavigate();

  function logout() {
    navigate(`/signin`);
    window.localStorage.clear();
  }

  return (
    <Button
      onClick={logout}
      startIcon={<PowerSettingsNewRoundedIcon />}
    ></Button>
  );
}

export default LogoutButton;
