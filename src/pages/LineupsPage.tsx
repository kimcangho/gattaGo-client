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

      {/* Mobile View Card */}
    </>
  );
};

export default LineupsPage;
