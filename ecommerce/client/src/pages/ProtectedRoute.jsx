import React from "react";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  return <Route element={element}></Route>;
};

export default ProtectedRoute;
