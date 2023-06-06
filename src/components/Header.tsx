import { Link } from "react-router-dom";
import gattaGoLogo from "../assets/logos/gattaGo-boat.svg";

interface HeaderProps {}

const Header = ({}: HeaderProps): JSX.Element => {
  return (
    <div className="bg-white flex justify-center items-center border border-gray-border px-6 py-1 tablet:p-4">
      <Link to="../" className="flex justify-center items-center space-x-2 tablet:space-x-3">
        <img src={gattaGoLogo} alt="gattaGo Logo" className="h-6 tablet:h-10" />
        <h2 className="text-gray-dark text-2xl tablet:text-3xl">gattaGo</h2>
      </Link>
    </div>
  );
};

export default Header;
