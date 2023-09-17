import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../../hooks/useLogoutRedirect";
import { LineupData } from "../../interfaces/EntityData";

interface LineupPlanSectionProps {
  id: string;
  setLineupSectionArr: Function;
}

const LineupPlanSection = ({
  id,
  setLineupSectionArr,
}: LineupPlanSectionProps) => {
  const [teamLineups, setTeamLineups] = useState<LineupData[] | null>(null);
  const [lineup, setLineup] = useState<string>("");
  const [boatOrder, setBoatOrder] = useState([]);

  const { teamId } = useParams<string>();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    const getTeamLineups = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/lineups`);
        console.log(data.lineups)
        setTeamLineups(data.lineups);

      } catch (err: unknown) {
        console.log(err);
        logoutRedirect("/login");
      }
    };

    getTeamLineups();
  }, []);

  return (
    <>
      <div className="flex flex-col mb-4 midMobile:w-[50%]">
        <label htmlFor="activeLineupId">
          <h3 className="text-blue-light">Lineup</h3>
        </label>
        <select
          // {...register("activeLineupId")}
          name="activeLineupId"
          id="activeLineupId"
          // value={selectDefaultValue}
          className="px-2 py-3 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
          // onChange={handleGetSingleLineup}
        >
          <option disabled>Select lineup</option>
          <option value={"new"}>New lineup</option>
          {/* {teamLineups &&
          teamLineups.map((lineup, index) => {
            return (
              <option key={index} value={lineup.id}>
                {lineup.name}
              </option>
            );
          })} */}
        </select>
      </div>
      {/* {transformLineupsToSeats(boatOrder).map(
        (row: any, index: number) => {
          return (
            <LineupSeat
              key={index}
              seat={index}
              row={row}
              activeId={activeId}
              overId={overId}
              isSaving={isSaving}
              isDeleting={isDeleting}
              isFetching={isFetching}
            />
          );
        }
      )} */}
    </>
  );
};

export default LineupPlanSection;
