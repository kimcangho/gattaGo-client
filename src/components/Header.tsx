import gattaGoLogo from "../assets/logos/gattaGo-boat.svg";

interface HeaderProps {}

const Header = ({}: HeaderProps): JSX.Element => {
  return (
    <div className="bg-white flex justify-center items-center border border-gray-border px-6 py-1 tablet:p-4 space-x-2 tablet:space-x-3">
      <img src={gattaGoLogo} alt="gattaGo Logo" className="h-6 tablet:h-10" />
      <h2 className="text-2xl tablet:text-3xl">gattaGo</h2>
    </div>
  );
};

export default Header;
