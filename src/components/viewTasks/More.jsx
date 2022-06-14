import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "../layouts/ConfirmationPopup";

export default function More({ task, setTasks }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [completeTaskPopup, setCompleteTaskPopup] = useState(false);
  const [deleteTaskPopup, setDeleteTaskPopup] = useState(false);

  const handleDeleteTask = () => {
    const existingtasks = JSON.parse(localStorage.getItem("tasks"));
    const tasks =
      Array.isArray(existingtasks) &&
      existingtasks.filter((t) => t.id !== task.id);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    setDeleteTaskPopup(false);
    setTasks(tasks);
  };

  const handleCompleteTask = () => {
    const existingtasks = JSON.parse(localStorage.getItem("tasks"));
    const tasks =
      Array.isArray(existingtasks) &&
      existingtasks.map((t) => {
        if (t.id === task.id) {
          t.endTime = Date.now();
        }
        return t;
      });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    setDeleteTaskPopup(false);
    setTasks(tasks);
  };

  return (
    <>
      <ConfirmationPopup
        title="Delete Task"
        open={deleteTaskPopup}
        onClose={() => setDeleteTaskPopup(false)}
        confirm="Delete"
        confirmBtnColor="error"
        onConfirm={handleDeleteTask}
      >
        Are you sure, want to delete this task ?
      </ConfirmationPopup>

      <div>
        <IconButton
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size="small"
        >
          <MoreVertOutlined />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleCompleteTask();
            }}
          >
            Complete Task
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(`/editTask/${task.id}`);
            }}
          >
            Edit Task
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setDeleteTaskPopup(true);
            }}
          >
            Delete Task
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
