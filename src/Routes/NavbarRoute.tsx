import { Navigate, Outlet, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const NavbarRoute = (): JSX.Element => {
  const { userId, teamId } = useParams<string>();

  if (!userId || !teamId) {
    return <Navigate to={`/${userId}/overview`} />;
  }

  return (
    <div className="px-2">
      <NavBar userId={userId} teamId={teamId} />
      <Outlet />
    </div>
  );
};

export default NavbarRoute;
