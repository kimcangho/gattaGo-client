import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import { LineupData } from "../interfaces/EntityData";

const LineupsPage = (): JSX.Element => {
  const [teamLineups, setTeamLineups] = useState<LineupData | {}>({});
  // const [manipulatedLineups, setManipulatedLineups] =
  //   useState<LineupData | null>(null);
  const { teamId } = useParams<string>();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    const getLineups = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/lineups`);
        setTeamLineups(data);
        // setManipulatedLineups(data.lineups);
      } catch (err: any) {
        logoutRedirect("/login");
      }
    };

    getLineups();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-between items-center max-w-[448px] tablet:max-w-full desktop:max-w-[1280px] mx-auto my-4 tablet:mb-0 overflow-hidden">
        <div className="mb-4">
          <h1>Lineups</h1>

          {teamLineups && teamLineups.lineups && (
            <p className="text-black">
              Total: {teamLineups.lineups.length} lineup
              {teamLineups.lineups.length !== 1 && `s`}
            </p>
          )}
        </div>

        <Link
          to={`../:userId/lineups/${teamId}/new`}
          className="bg-green-light hover:bg-green-dark p-2 rounded border border-green-dark text-white"
        >
          Add Lineup
        </Link>
      </div>

      {/* To-do Part 1 - Page Setup */}
      {/* Drop Down list for lineup selection */}
      {/* Dragonboat overhead view - 1 x 1 centered box, 2 x 10 grid, 1 x 1 box */}

      {/* To-do Part 2 - Mobile View Card */}
      {/* Modal with side tab - contains all team athletes */}
      {/* Modal will be drag + drop enabled with floating tab on bottom left, can also scroll independent from page */}
      {/* Athlete bars containg drag and drop tiles that can migrate from modal to dragonboat */}
      {/* When tile is moved outside of modal, collapse modal. */}
      {/* When tile is dropped into appropriate spot on dragonboat, uncollapse modal */}
      {/* Tab visible in mobile from 320px to 448px */}
      {/* Dragonboat and tiles expand from 320px to 448 px */}
      {/* From 448px to 768px, can now bring unhide modal and move to right side as column of tiles */}

      {/* To-do Part 3 - Tablet + Desktop Views */}
      {/* from 768px to 1280 px, show fixed dragonboat on left and roster list on right @ 50% width share */}
      {/* Dragonboat size expands up to a fixed width ~ 50% of container */}
      {/* Roster list starts off as single column of tiles, then double column of tiles, then list of athletes with tiles + stats */}
      {/* container max-width at 1280px, horizontal auto-margins */}
    </>
  );
};

export default LineupsPage;
