import { useNavigate } from "react-router-dom";
import { FormikProvider, Form, useFormik } from "formik";
import * as Yup from "yup";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please provide a valid input")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must contain atleast 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (formData) => {
    console.log({ formData });

    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    navigate("/viewTasks");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: handleLogin,
  });

  const { errors, touched, getFieldProps, handleSubmit } = formik;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 550,
          minWidth: 400,
          width: "100%",
          borderRadius: 4,
          p: 3,
        }}
        elevation={3}
      >
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off">
            <CardContent>
              <Typography align="center" variant="h2">
                Login
              </Typography>
            </CardContent>

            <CardContent>
              <TextField
                fullWidth
                label="Email"
                type="email"
                sx={{ marginBottom: 4 }}
                color="primary"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                sx={{ marginBottom: 4 }}
                color="primary"
                {...getFieldProps("password")}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </CardContent>

            <CardContent>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleSubmit}
              >
                Login
              </Button>
            </CardContent>
          </Form>
        </FormikProvider>
      </Card>
    </Box>
  );
};

export default Login;
