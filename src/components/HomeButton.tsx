import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

function HomeButton() {
  const navigate = useNavigate();
  const username = window.location.pathname.split("/")[2];

  function returnPreviousPage() {
    navigate(`/user/${username}`);
  }

  return (
    <Button
      startIcon={<HomeRoundedIcon />}
      onClick={returnPreviousPage}
    ></Button>
  );
}

export default HomeButton;
