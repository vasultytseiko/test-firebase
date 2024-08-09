import React from "react";
import { Route, Routes } from "react-router-dom";
import Notifications from "../pages/Notifications/NotificationPage";
import SignIn from "../pages/SignIn/SignIn";
import PrivateRoute from "./PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
