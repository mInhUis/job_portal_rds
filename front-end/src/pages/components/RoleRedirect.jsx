import React from 'react';
import { Navigate } from 'react-router-dom';
import DashBoardPage from "../DashBoardPage";
import EmDashBoardPage from "../EmDashBoardPage";

export const RoleRedirect = ({ userRole }) => {
  if (userRole === "employer") return <EmDashBoardPage />;
  if (userRole === "jobseeker") return <DashBoardPage />;
  return <Navigate to="/" />;
};


