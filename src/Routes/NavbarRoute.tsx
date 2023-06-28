import { Navigate, Outlet, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const NavbarRoute = (): JSX.Element => {
  const { teamId } = useParams<string>();

  if (!teamId) {
    return <Navigate to={`/:userId/overview`} />;
  }

  return (
    <div className="px-2">
      <NavBar teamId={teamId} />
      <Outlet />
    </div>
  );
};

export default NavbarRoute;
