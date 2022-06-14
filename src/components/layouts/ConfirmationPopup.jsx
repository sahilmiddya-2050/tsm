import React from "react";
// material
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useTheme from "@mui/material/styles/useTheme";

export default function ConfirmationPopup({
  open,
  onClose,
  onConfirm,
  title,
  confirm,
  cancel = "Cancel",
  children,
  color = "primary",
  disabled = false,
  confirmBtnColor,
}) {
  return (
    <div>
      <Dialog
        open={open}
        // onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ minWidth: "320px" }}
          >
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="secondary">
            {cancel}
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color={confirmBtnColor || "success"}
            disabled={disabled}
          >
            {confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
