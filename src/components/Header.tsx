import { Link } from "react-router-dom";
import gattaGoLogo from "../assets/logos/gattaGo-boat.svg";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header = ({ isLoggedIn }: HeaderProps): JSX.Element => {
  return (
    <div
      className={`bg-white flex ${
        !isLoggedIn ? `justify-between` : `justify-center`
      } items-center border border-gray-border px-6 py-1 tablet:p-4`}
    >
      <Link
        to="../"
        className="flex justify-center items-center space-x-2 tablet:space-x-3"
      >
        <img src={gattaGoLogo} alt="gattaGo Logo" className="h-6 tablet:h-10" />
        <h2 className="text-gray-dark text-2xl tablet:text-3xl">gattaGo</h2>
      </Link>
      {!isLoggedIn && (
        <div className="flex bg-white border border-gray-border rounded">
          <Link
            to="../test/dashboard"
            className="border-r border-gray-border rounded-l hover:bg-blue-light hover:text-white"
          >
            <p className="px-4 py-2">My Teams</p>
          </Link>
          <Link
            to="../login"
            className="hover:bg-orange-dark hover:text-white rounded-r"
          >
            <p className="px-4 py-2">Logout</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
