import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../../hooks/useLogoutRedirect";
import { LineupData } from "../../interfaces/EntityData";
import RacePlanBoatLineup from "./RacePlanBoatLineup";
import { generatePlaceholderLineup } from "../../utils/generatePlaceholderLineup";

interface LineupSectionData {
  id: string;
  lineupName: string;
  lineupId: string;
}

interface LineupPlanSectionProps {
  id: string;
  lineupSection: LineupSectionData;
  setLineupSectionArr: Function;
  setIsFetching: Function;
}

const LineupPlanSection = ({
  id,
  lineupSection,
  setLineupSectionArr,
  setIsFetching,
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
  const [currentLineup, setCurrentLineup] = useState([]);

  const { teamId } = useParams<string>();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  const { register, setValue, getValues } = useForm({
    defaultValues: {
      activeLineupId: "new",
      lineupName: "",
    },
  });

  useEffect(() => {
    const getTeamLineups = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/lineups`);
        setTeamLineups(data.lineups);
      } catch (err: unknown) {
        console.log(err);
        logoutRedirect("/login");
      }

      if (lineupId !== "new" && teamLineups?.length) {
        const handleInitialGetLineup = async () => {
          try {
            setIsFetching(true);
            const { data } = await axiosPrivate.get(
              `/teams/${teamId}/lineups/${lineupId}`
            );

            setCurrentLineup(data?.lineups[0]?.athletes);
            setValue("lineupName", data.lineups[0].name);
            setValue("activeLineupId", data.lineups[0].id);
            setIsFetching(false);
          } catch (err: unknown) {
            console.log(err);
          }
        };
        handleInitialGetLineup();
      }
    };

    getTeamLineups();
  }, []);

  useEffect(() => {
    handleSetLineupSection();
  }, [lineupName]);

  const handleSetLineupSection = () => {
    setLineupSectionArr((currentArr: LineupSectionData[]) => {
      const filteredArr = currentArr.filter(
        (lineupSection: LineupSectionData) => lineupSection.id !== id
      );
      return [
        ...filteredArr,
        {
          id,
          lineupName,
          lineupId: getValues("activeLineupId"),
        },
      ];
    });
  };

  const handleGetSingleLineup = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectDefaultValue(event.target.value);
    if (event.target.value === "new") {
      try {
        setLineupId("");
        setCurrentLineup([]);
        setValue("lineupName", "");
        setValue("activeLineupId", "new");
      } catch (err: unknown) {
        console.log(err);
      }
    } else {
      try {
        setIsFetching(true);
        const { data } = await axiosPrivate.get(
          `/teams/${teamId}/lineups/${event.target.value}`
        );

        setCurrentLineup(data.lineups[0].athletes);
        setLineupId(data.lineups[0].id);
        setValue("lineupName", data.lineups[0].name);
        setValue("activeLineupId", data.lineups[0].id);
        setIsFetching(false);
      } catch (err: unknown) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col w-full bg-white shadow-md rounded-md p-2">
      <div className="flex flex-col w-full mb-4">
        <input
          placeholder="Type lineup title here"
          value={lineupName}
          onChange={(event) => {
            setLineupName(event.target.value);
          }}
          className={`bg-inherit text-2xl p-2 text-center mb-2 ${
            lineupName ? "text-black" : ""
          }`}
        />
        <select
          {...register("activeLineupId")}
          name="activeLineupId"
          id="activeLineupId"
          value={selectDefaultValue}
          className="px-2 py-3 bg-white-dark border border-gray-border rounded focus:outline-blue-light midMobile:w-[75%] mx-auto"
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

      <RacePlanBoatLineup
        currentLineup={
          currentLineup ? currentLineup : generatePlaceholderLineup()
        }
      />
    </div>
  );
};

export default LineupPlanSection;
