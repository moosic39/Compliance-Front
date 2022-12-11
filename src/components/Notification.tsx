import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert/index";
import { Slide } from "@mui/material";
import { useEffect } from "react";

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
  useEffect(() => {
    if (props.isNotif) {
      console.log("on est content?");
      handleOpen();
    }
    if (!props.isNotif) {
      handleClose();
    }
  }, [props.isNotif]);

  return (
    <Stack>
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
