import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function ReturnButton() {
  const navigate = useNavigate();

  function returnPreviousPage() {
    navigate(-1);
  }

  return <Button onClick={returnPreviousPage}>Return</Button>;
}

export default ReturnButton;
