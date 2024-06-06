import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStageChange from "../hooks/useAuthStageChange";

function ProtectRoute() {
  const location = useLocation();
  const { user } = useAuthStageChange();

  return user === null ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default ProtectRoute;
