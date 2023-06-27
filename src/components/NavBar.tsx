import homeIcon from "../assets/icons/home-navbar.svg";
import rosterIcon from "../assets/icons/roster-navbar.svg";
import lineupsIcon from "../assets/icons/lineups-navbar.svg";
import scheduleIcon from "../assets/icons/calendar-navbar.svg";

const NavBar = () => {
  return (
    <div className="flex mx-auto justify-center desktop:max-w-[1280px] text-white border-2 border-blue-dark rounded-b-2xl">
      <div className="flex flex-col items-center p-2 tablet:p-4 bg-blue-light hover:bg-blue-dark w-[25%] rounded-bl-xl border-r border-blue-dark">
        <img src={homeIcon} alt="Home" className="w-6 tablet:w-8" />
        <p className="tablet:text-xl">Home</p>
      </div>
      <div className="flex flex-col items-center p-2 tablet:p-4 bg-blue-light hover:bg-blue-dark w-[25%] border-x border-blue-dark">
        <img src={rosterIcon} alt="Roster" className="w-6 tablet:w-8" />
        <p className="tablet:text-xl">Roster</p>
      </div>
      <div className="flex flex-col items-center p-2 tablet:p-4 bg-blue-light hover:bg-blue-dark w-[25%] border-x border-blue-dark">
        <img src={lineupsIcon} alt="Lineups" className="w-6 tablet:w-8" />
        <p className="tablet:text-xl">Lineups</p>
      </div>
      <div className="flex flex-col items-center p-2 tablet:p-4 bg-blue-light hover:bg-blue-dark w-[25%] rounded-br-xl border-l border-blue-dark">
        <img src={scheduleIcon} alt="Schedule" className="w-6 tablet:w-8" />
        <p className="tablet:text-xl">Schedule</p>
      </div>
    </div>
  );
};

export default NavBar;
