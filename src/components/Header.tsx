import {
  useNavigate,
  NavigateFunction,
  useLocation,
  Location,
} from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import { axiosAuth } from "../services/axios.service";
import gattaGoLogo from "../assets/logos/gattaGo-boat.svg";

const Header = (): JSX.Element => {
  const {
    accessToken,
    setAccessToken,
    setUserId,
    email,
    setEmail,
    userId,
    isLoggedIn,
    setIsLoggedIn,
    currentTeamDetails,
    setCurrentTeamDetails,
  }: AuthContextTypes = useContext(AuthContext)!;
  const { name, eligibility, division } = currentTeamDetails;
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const handleTeamOverviewRedirect = () => {
    setCurrentTeamDetails({ name: "", eligibility: "", division: "" });
    if (accessToken) navigate(`../${userId}/overview`);
    else navigate("../");
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      setIsLoggingOut(true);
      await axiosAuth.delete(`/logout`, {
        data: { accessToken },
        withCredentials: true,
      });
      setAccessToken("");
      setUserId("");
      setEmail("");
      setCurrentTeamDetails({ name: "", eligibility: "", division: "" });
      setIsLoggedIn((isLoggedIn: boolean) => !isLoggedIn);
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setIsLoggingOut(false);
      navigate("../login");
    }
  };

  return (
    <div
      className={`bg-white flex justify-between
       items-center border border-gray-border px-1 py-1 tablet:p-4`}
    >
      <div className="flex space-x-2 tablet:space-x-3 items-center">
        <div
          onClick={handleTeamOverviewRedirect}
          className="flex justify-center items-center space-x-2 tablet:space-x-3 cursor-pointer"
        >
          <img
            src={gattaGoLogo}
            alt="gattaGo Logo"
            className="h-6 tablet:h-10"
          />
          {!isLoggedIn && (
            <h2 className="text-gray-dark text-2xl tablet:text-3xl">gattaGo</h2>
          )}
        </div>
        {isLoggedIn && (
          <h2 className="text-gray-dark text-sm midMobile:text-2xl tablet:text-3xl truncate max-w-[80%] midMobile:max-w-full">
            {name ? name : email}
          </h2>
        )}
      </div>

      <div className="flex bg-white border border-gray-border rounded">
        <div
          onClick={
            isLoggedIn
              ? handleTeamOverviewRedirect
              : () => {
                  navigate("../signup");
                }
          }
          className={`border-r border-gray-border rounded-l hover:bg-blue-light hover:text-white ${
            location.pathname === "/signup" ? "bg-blue-light text-white" : ""
          }  cursor-pointer`}
        >
          <p className="px-2 py-1 tablet:px-4 tablet:py-2">
            {isLoggedIn ? "Teams" : "Sign-up"}
          </p>
        </div>
        <div
          className={`${
            isLoggedIn ? "hover:bg-orange-light" : "hover:bg-green-light"
          } hover:text-white rounded-r ${
            !isLoggingOut
              ? "cursor-pointer"
              : "bg-orange-light text-white cursor-wait"
          } ${
            location.pathname === "/login" ? "bg-green-light text-white" : ""
          } `}
          onClick={
            isLoggedIn
              ? handleLogout
              : () => {
                  navigate("../login");
                }
          }
        >
          <p className="px-2 py-1 tablet:px-4 tablet:py-2">
            {isLoggedIn
              ? !isLoggingOut
                ? "Logout"
                : "Logging Out..."
              : "Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
