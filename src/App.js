import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CssBaseline from "@mui/material/CssBaseline";

import PrivetRoute from "./routingHelpers/PrivetRoute";
import PublicRoute from "./routingHelpers/PublicRoute";

import ResponsiveAppBar from "./components/Appbar";

import Login from "./pages/login";
import ViewTasks from "./pages/viewTasks";
import EditTasks from "./pages/editTask";
import JokesSpot from "./pages/jokesSpot";

function RedirectToLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);

  return null;
}

function App() {
  return (
    <>
      <CssBaseline />

      <Routes>
        <Route path="/" element={<RedirectToLogin />} />
        <Route
          path="login"
          element={
            <PublicRoute redirectUrl="/viewTasks" component={<Login />} />
          }
        />

        <Route path="/" element={<ResponsiveAppBar />}>
          <Route
            path="viewTasks"
            element={
              <PrivetRoute redirectUrl="/login" component={<ViewTasks />} />
            }
          />

          <Route
            path="editTask/:taskId"
            element={
              <PrivetRoute redirectUrl="/login" component={<EditTasks />} />
            }
          />

          <Route
            path="jokesSpot"
            element={
              <PrivetRoute redirectUrl="/login" component={<JokesSpot />} />
            }
          />
        </Route>
        {/* <ResponsiveAppBar /> */}
      </Routes>
    </>
  );
}

export default App;
