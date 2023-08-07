import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import OverviewTeamItem from "../components/OverviewTeamItem";
import { TeamData } from "../interfaces/EntityData";

const OverviewPage = (): JSX.Element => {
  const [myTeams, setMyTeams] = useState<TeamData[]>([]);
  const { userId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    const getAllTeams = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/user/${userId}`, {
          withCredentials: true,
        });
        setMyTeams(data);
      } catch (err) {
        console.log(err);
        logoutRedirect("/login");
      }
    };

    getAllTeams();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center tablet:max-w-full desktop:max-w-[1280px] my-4 tablet:mb-0 overflow-hidden mx-2 tablet:mx-4">
        <div>
          <h1>Teams</h1>
          <p className="text-black">
            Total: {myTeams.length} team{myTeams.length !== 1 && `s`}
          </p>
        </div>

        <Link
          to={`../${userId}/new`}
          className="bg-green-light hover:bg-green-dark p-2 rounded border border-green-dark text-white"
        >
          Create Team
        </Link>
      </div>

      <div className="p-2 tablet:p-4 desktop:w-[1280px] desktop:mx-auto flex flex-col">
        {myTeams.map((team) => {
          return (
            <OverviewTeamItem
              key={team.id}
              id={team.id}
              name={team.name}
              myTeams={myTeams}
              setMyTeams={setMyTeams}
            />
          );
        })}
      </div>
    </>
  );
};

export default OverviewPage;
