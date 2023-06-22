import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import gattaGoLogo from "../assets/logos/gattaGo-boat.svg";

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
}

const Header = ({ isLoggedIn, setIsLoggedIn }: HeaderProps): JSX.Element => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggedIn((isLoggedIn: boolean) => !isLoggedIn);
    
    try {
      await axios.delete(`http://localhost:7777/logout`, {
        withCredentials: true,
      });
      console.log("successfully logged out!");
    } catch (err) {
      console.log(err);
    }

    navigate("../login");
  };

  return (
    <div
      className={`bg-white flex ${
        isLoggedIn ? `justify-between` : `justify-center`
      } items-center border border-gray-border px-1 py-1 tablet:p-4`}
    >
      <Link
        to="../"
        className="flex justify-center items-center space-x-2 tablet:space-x-3"
      >
        <img src={gattaGoLogo} alt="gattaGo Logo" className="h-6 tablet:h-10" />
        <h2 className="text-gray-dark text-2xl tablet:text-3xl">gattaGo</h2>
      </Link>
      {isLoggedIn && (
        <div className="flex bg-white border border-gray-border rounded">
          <Link
            to="../test/dashboard"
            className="border-r border-gray-border rounded-l hover:bg-blue-light hover:text-white"
          >
            <p className="px-2 py-1 tablet:px-4 tablet:py-2">My Teams</p>
          </Link>
          <div
            className="hover:bg-orange-dark hover:text-white rounded-r cursor-pointer"
            onClick={handleLogout}
          >
            <p className="px-2 py-1 tablet:px-4 tablet:py-2">Logout</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
