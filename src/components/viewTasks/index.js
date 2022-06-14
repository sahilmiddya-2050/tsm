import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import ConfirmationPopup from "../layouts/ConfirmationPopup";
import CreateNewTask from "../createTask";
import TaskTable from "./TaskTable";

const ViewTasksComponent = () => {
  const _tasks = JSON.parse(localStorage.getItem("tasks"));

  const [searchValue, setSearchValue] = useState("");

  const [tasks, setTasks] = useState(_tasks);

  useEffect(() => {
    if (searchValue === "") {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }

    // const searchedTasks =
    //   Array.isArray(tasks) &&
    //   tasks.filter(
    //     (t) =>
    //       t.taskname.toLowerCase().includes(searchValue.toLowerCase()) ||
    //       t.description.toLowerCase().includes(searchValue.toLowerCase())
    //   );

    // setTasks(searchedTasks);
  }, [searchValue]);

  const handleSearch = (e) => {
    const query = e.target.value;

    setSearchValue(query);

    const searchedTasks =
      Array.isArray(tasks) &&
      tasks.filter(
        (t) =>
          t.taskname.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase())
      );

    setTasks(searchedTasks);
  };

  if (
    !searchValue &&
    (tasks === null || (Array.isArray(tasks) && tasks.length === 0))
  ) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CreateNewTask setTasks={setTasks} />
        </Box>

        <Typography
          variant="h1"
          color="primary"
          align="center"
          sx={{ marginTop: 10 }}
        >
          No Tasks Available
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CreateNewTask setTasks={setTasks} />
      </Box>

      <Box>
        <TextField
          label="Search Tasks"
          value={searchValue}
          onChange={handleSearch}
        />
      </Box>

      <Box sx={{ mt: 5 }}>
        <TaskTable tasks={tasks} setTasks={setTasks} />
      </Box>
    </Container>
  );
};

export default ViewTasksComponent;
