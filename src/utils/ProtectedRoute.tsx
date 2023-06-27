import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

interface ProtectedRouteProps {
  redirectPath: string;
}

const ProtectedRoute = ({ redirectPath }: ProtectedRouteProps): JSX.Element => {
  const { email }: any = useContext(AuthContext);

  if (!email) {
    return <Navigate to={`/${redirectPath}`} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
