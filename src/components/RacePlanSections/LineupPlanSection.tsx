import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../../hooks/useLogoutRedirect";
import { LineupData } from "../../interfaces/EntityData";

//  imported libraries
import { useForm } from "react-hook-form";

interface LineupSectionData {
  id: string;
  lineupName: string;
  lineupId: string;
  boatOrder: (string | null)[];
}

interface LineupPlanSectionProps {
  id: string;
  lineupSection: LineupSectionData;
  setLineupSectionArr: Function;
}

const LineupPlanSection = ({
  id,
  lineupSection,
  setLineupSectionArr,
}: LineupPlanSectionProps) => {
  const [teamLineups, setTeamLineups] = useState<LineupData[] | null>(null); //  list of lineups
  const [selectDefaultValue, setSelectDefaultValue] = useState<string>(
    lineupSection.lineupId || "new"
  );
  const [lineupName, setLineupName] = useState<string>(
    lineupSection.lineupName || ""
  );
  const [lineupId, setLineupId] = useState<string>(
    lineupSection.lineupId || ""
  );
  const [boatOrder, setBoatOrder] = useState([]);

  const { teamId } = useParams<string>();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  const { register, setValue, getValues } = useForm({
    defaultValues: {
      activeLineupId: "new",
      lineupName: "",
    },
  });

  //  useEffect to get lineups list
  useEffect(() => {
    const getTeamLineups = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/lineups`);
        console.log(data);
        setTeamLineups(data.lineups);
      } catch (err: unknown) {
        console.log(err);
        logoutRedirect("/login");
      }
    };

    //  add function to handle fetching team data on mount
    if (boatOrder)
      console.log(
        "get extra info",
        lineupId
      ); //  fetch call for single lineup data
    else console.log("empty boat order");

    getTeamLineups();
  }, []);

  // useEffect(() => {
  //   //  add function to handle fetching team data on mount
  //   if (boatOrder) console.log("get extra info");
  //   else console.log("empty boat order");
  // }, [teamLineups]);

  //  get lineup whenever drop down menu changes
  const handleGetSingleLineup = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectDefaultValue(event.target.value);
    if (event.target.value === "new") {
      try {
        // setActiveLineup(injectIntoLineup([]));
        setLineupId("");
        setValue("lineupName", "");
        setValue("activeLineupId", "new");
      } catch (err: unknown) {
        console.log(err);
      }
    } else {
      try {
        // setIsFetching(true);
        const { data } = await axiosPrivate.get(
          `/teams/${teamId}/lineups/${event.target.value}`
        );

        setBoatOrder(data.lineups[0].athletes);
        setLineupId(data.lineups[0].id);
        setValue("lineupName", data.lineups[0].name);
        setValue("activeLineupId", data.lineups[0].id);
        // setIsFetching(false);
      } catch (err: unknown) {
        console.log(err);
      }
    }
  };

  //  set lineup section
  const handleSetLineupSection = () => {
    setLineupSectionArr((currentArr: LineupSectionData[]) => {
      const filteredArr = currentArr.filter(
        (lineupSection: LineupSectionData) => lineupSection.id !== id
      );
      const newArr = [
        ...filteredArr,
        {
          id,
          lineupName,
          lineupId: getValues("activeLineupId"),
        },
      ];
      console.log(newArr);
      return [...newArr];
    });
  };

  return (
    <div className="flex flex-col border border-black rounded-md p-2">
      <div className="flex flex-col mb-4 midMobile:w-[50%]">
        <input
          placeholder="Type lineup title here"
          value={lineupName}
          onChange={(event) => {
            console.log("setting lineup name: ", event.target.value);
            setLineupName(event.target.value);
            handleSetLineupSection();
          }}
          className={`bg-inherit text-2xl p-2 ${
            lineupName ? "text-black" : ""
          }`}
        />
        <select
          {...register("activeLineupId")}
          name="activeLineupId"
          id="activeLineupId"
          value={selectDefaultValue}
          className="px-2 py-3 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
          onChange={async (event) => {
            await handleGetSingleLineup(event);
            handleSetLineupSection();
          }}
        >
          <option disabled>Select lineup</option>
          <option value={"new"}>Select lineup</option>
          {teamLineups &&
            teamLineups.map((lineup, index) => {
              return (
                <option key={index} value={lineup.id}>
                  {lineup.name}
                </option>
              );
            })}
        </select>
      </div>
      {/* Map Boat Order to get boat seats */}
      <h2>
        {lineupId} {lineupName} Lineup
      </h2>
      <h3>{boatOrder.length} boat order length</h3>
    </div>
  );
};

export default LineupPlanSection;
