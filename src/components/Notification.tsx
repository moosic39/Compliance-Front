import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Slide } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface isNotifProps {
  isNotif: boolean;
}

export default function Notification(props: isNotifProps) {
  const [open, setOpen] = React.useState(false);

  console.log("props", props.isNotif);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  // if (props.isNotif) {
  //   setOpen(true);
  // }
  // if (!props.isNotif) {
  //   setOpen(false);
  // }

  return (
    <Stack>
      <Button variant="outlined" onClick={handleOpen}>
        Open snackbar
      </Button>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        // autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Take your medications
        </Alert>
      </Snackbar>
    </Stack>
  );
}
