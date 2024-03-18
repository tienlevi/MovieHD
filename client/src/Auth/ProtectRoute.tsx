import { Navigate, Outlet, useLocation } from "react-router-dom";

function Protect() {
  const location = useLocation();
  const currentUser = localStorage.getItem("User");

  return !currentUser ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default Protect;
