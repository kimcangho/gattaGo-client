import { useNavigate, NavigateFunction } from "react-router-dom";
import { useContext } from "react";
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
    currentTeamName,
    setCurrentTeamName,
  }: AuthContextTypes = useContext(AuthContext)!;
  const navigate: NavigateFunction = useNavigate();

  const handleTeamOverviewRedirect = () => {
    setCurrentTeamName("");
    if (accessToken) navigate(`../${userId}/overview`);
    else navigate("../");
  };

  const handleLogout = async () => {
    setIsLoggedIn((isLoggedIn: boolean) => !isLoggedIn);

    try {
      await axiosAuth.delete(`/logout`, {
        data: { accessToken },
        withCredentials: true,
      });
      setAccessToken("");
      setUserId("");
      setEmail("");
      setCurrentTeamName("");
    } catch (err) {
      console.log(err);
    } finally {
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
            {currentTeamName ? currentTeamName : email}
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
          className="border-r border-gray-border rounded-l hover:bg-blue-light hover:text-white cursor-pointer"
        >
          <p className="px-2 py-1 tablet:px-4 tablet:py-2">
            {isLoggedIn ? "Teams" : "Sign-up"}
          </p>
        </div>
        <div
          className={`${
            isLoggedIn ? "hover:bg-orange-light" : "hover:bg-green-light"
          } hover:text-white rounded-r cursor-pointer`}
          onClick={
            isLoggedIn
              ? handleLogout
              : () => {
                  navigate("../login");
                }
          }
        >
          <p className="px-2 py-1 tablet:px-4 tablet:py-2">
            {isLoggedIn ? "Logout" : "Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
