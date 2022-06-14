import { useMatch, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormikProvider, Form, useFormik } from "formik";
import * as Yup from "yup";
import { v4 } from "uuid";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import Container from "@mui/material/Container";

const validation = Yup.object().shape({
  taskname: Yup.string()
    .required("taskname is required")
    .min(1, "atleast 1 character must be provided"),
  description: Yup.string()
    .required("description is required")
    .min(3, "atleast 3 character must be provided"),
});

const EditTaskComponent = () => {
  const navigate = useNavigate();
  const params = useParams();

  console.log({ params });

  const [initialValues, setInitialValues] = useState({
    taskname: "",
    description: "",
  });

  const [extraValues, setExtraValues] = useState({
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskId = params.taskId;

    const task = tasks.find((t) => t.id === taskId);

    console.log({ task });
    if (!task) {
      return navigate("/viewTasks");
    }

    setInitialValues({
      taskname: task.taskname,
      description: task.description,
    });

    setExtraValues({
      startTime: task.startTime,
      endTime: task.endTime,
    });
  }, [params.taskId]);

  const handleEditTask = (formData) => {
    const existingtasks = JSON.parse(localStorage.getItem("tasks"));
    const taskId = params.taskId;

    const task = {
      ...formData,
      id: v4(),
      startTime: extraValues.startTime,
      endTime: extraValues.endTime,
    };

    const tasks =
      Array.isArray(existingtasks) &&
      existingtasks.map((t) => {
        if (t.id === taskId) {
          return task;
        } else {
          return t;
        }
      });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    handleReset();
    navigate("/viewTasks");
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: handleEditTask,
  });

  const { errors, touched, getFieldProps, handleSubmit, handleReset } = formik;

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 7,
        }}
      >
        <Card sx={{ maxWidth: 500, minWidth: 400, width: "100%" }}>
          <CardHeader title="Task" />

          <CardContent>
            <Box>
              <FormikProvider value={formik}>
                <Form noValidate autoComplete="off">
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
                </Form>
              </FormikProvider>
            </Box>
          </CardContent>

          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                handleReset();
                navigate("/viewTasks");
              }}
            >
              Go To Tasks
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Edit
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default EditTaskComponent;
