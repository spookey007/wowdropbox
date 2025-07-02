import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("luckyBox#@user");

  if (location.pathname === "/verify-email") {
    const params = new URLSearchParams(location.search);
    const hash = params.get("emailVerificationHash");
    return hash ? <Outlet /> : <Navigate to="/" replace />;
  }

  // Normal auth-protected routes
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
