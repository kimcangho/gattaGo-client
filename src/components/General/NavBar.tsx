import { NavLink } from "react-router-dom";
import dashboardIcon from "../../assets/icons/dashboard-chart-navbar.svg";
import rosterIcon from "../../assets/icons/roster-navbar.svg";
import lineupsIcon from "../../assets/icons/lineups-navbar.svg";
import calendarIcon from "../../assets/icons/calendar-navbar.svg";
import useWindowSize from "../../hooks/useWindowSize";

interface NavBarProps {
  userId: string;
  teamId: string;
}

const NavBar = ({ userId, teamId }: NavBarProps) => {
  const { width } = useWindowSize();
  return (
    <div className="flex mx-auto justify-center desktop:max-w-[1280px] text-white border-2 border-blue-dark rounded-b-2xl shadow-lg">
      <NavLink
        to={`../${userId}/dashboard/${teamId}`}
        className={`flex flex-col items-center p-2 tablet:p-4 bg-blue-light hover:bg-blue-dark w-[25%] rounded-bl-xl border-r border-blue-dark`}
      >
        <img src={dashboardIcon} alt="Home" className="w-6 tablet:w-8" />
        {width! >= 448 && <p className="tablet:text-xl">Dashboard</p>}
      </NavLink>
      <NavLink
        to={`../${userId}/roster/${teamId}`}
        className="flex flex-col items-center p-2 tablet:p-4 bg-blue-light hover:bg-blue-dark w-[25%] border-x border-blue-dark"
      >
        <img src={rosterIcon} alt="Roster" className="w-6 tablet:w-8" />
        {width! >= 448 && <p className="tablet:text-xl">Roster</p>}
      </NavLink>

      <NavLink
        to={`../${userId}/lineups/${teamId}`}
        className="flex flex-col items-center p-2 tablet:p-4 bg-blue-light hover:bg-blue-dark w-[25%] border-x border-blue-dark"
      >
        <img src={lineupsIcon} alt="Lineups" className="w-6 tablet:w-8" />
        {width! >= 448 && <p className="tablet:text-xl">Lineups</p>}
      </NavLink>

      <NavLink
        to={`../${userId}/race_day_plan/${teamId}`}
        className="flex flex-col items-center text-center p-2 tablet:p-4 bg-blue-light hover:bg-blue-dark w-[25%] rounded-br-xl border-l border-blue-dark"
      >
        <img src={calendarIcon} alt="Race day" className="w-6 tablet:w-8" />
        {width! >= 448 && <p className="tablet:text-xl">Race Plans</p>}
      </NavLink>
    </div>
  );
};

export default NavBar;
