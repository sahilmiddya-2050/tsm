import { useState } from "react";
import { FormikProvider, Form, useFormik } from "formik";
import * as Yup from "yup";
import { v4 } from "uuid";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import ConfirmationPopup from "../layouts/ConfirmationPopup";

/*
- taskname
- description
- Start time
- End Time

*/

const validation = Yup.object().shape({
  taskname: Yup.string()
    .required("taskname is required")
    .min(1, "atleast 1 character must be provided"),
  description: Yup.string()
    .required("description is required")
    .min(3, "atleast 3 character must be provided"),
});

const CreateNewTask = ({ setTasks }) => {
  const [createTaskPopup, setCreateTaskPopup] = useState(false);

  const handleCreateTask = (formData) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = [
      {
        ...formData,
        id: v4(),
        startTime: Date.now(),
        endTime: null,
      },
    ];

    if (tasks === null || tasks === undefined) {
      localStorage.setItem("tasks", JSON.stringify(task));
      setTasks(task);
    }

    if (Array.isArray(tasks)) {
      tasks.push(task[0]);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(tasks);
    }

    setCreateTaskPopup(false);
    handleReset();
  };

  const formik = useFormik({
    initialValues: {
      taskname: "",
      description: "",
    },
    validationSchema: validation,
    onSubmit: handleCreateTask,
  });

  const { errors, touched, getFieldProps, handleSubmit, handleReset } = formik;

  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="success"
        onClick={() => setCreateTaskPopup(true)}
      >
        Create New Task
      </Button>

      <ConfirmationPopup
        open={createTaskPopup}
        title="Create a task"
        confirm="Create"
        onClose={() => setCreateTaskPopup(false)}
        onConfirm={handleSubmit}
      >
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off">
            <Box>
              <TextField
                fullWidth
                label="Task Name"
                {...getFieldProps("taskname")}
                error={Boolean(touched.taskname && errors.taskname)}
                helperText={touched.taskname && errors.taskname}
              />

              <Box sx={{ mt: 2 }}>
                <Box sx={{ pl: 1, mb: 1 }}>Description</Box>

                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={5}
                  // placeholder=""
                  {...getFieldProps("description")}
                  style={{ width: "100%", paddingLeft: 15, paddingTop: 10 }}
                />
                {Boolean(touched.description && errors.description) && (
                  <Box sx={{ pl: 2.5, color: "red" }}>
                    {touched.description && errors.description}
                  </Box>
                )}
              </Box>
            </Box>
          </Form>
        </FormikProvider>
      </ConfirmationPopup>
    </>
  );
};

export default CreateNewTask;
