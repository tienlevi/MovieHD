import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectRoute() {
  const location = useLocation();
  const { user } = useAuth();

  return user === null ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default ProtectRoute;
