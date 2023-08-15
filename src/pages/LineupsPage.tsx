import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import { LineupData, RosterData } from "../interfaces/EntityData";
import { SaveNewLineupFormData } from "../interfaces/FormData";
import LineupBoatSection from "../components/LineupBoatSection";
import { generatePlaceholderLineup } from "../utils/generatePlaceholderLineup";
import { injectIntoLineup } from "../utils/injectIntoLineup";
import { trimActiveLineup } from "../utils/trimActiveLineup";
import { ActiveLineupData } from "../interfaces/EntityData";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion, useIsPresent } from "framer-motion";

const LineupsPage = (): JSX.Element => {
  const [teamLineups, setTeamLineups] = useState<LineupData[] | null>(null);
  const [activeLineup, setActiveLineup] = useState<ActiveLineupData[]>(
    generatePlaceholderLineup()
  );
  const [selectDefaultValue, setSelectDefaultValue] = useState<string>("");
  const [rosterAthletes, setRosterAthletes] = useState<RosterData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { teamId } = useParams<string>();
  const { width } = useWindowSize();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();
  const isPresent = useIsPresent();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SaveNewLineupFormData>({
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
    };

    const getAthletes = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/athletes`);
        setRosterAthletes(data);
      } catch (err: unknown) {
        console.log(err);
      }
    };

    Promise.all([getTeamLineups(), getAthletes()])
      .then(() => {
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  }, []);

  const handleSaveLineup = async ({
    lineupName,
    activeLineupId,
  }: SaveNewLineupFormData) => {
    const createTeamLineup = async () => {
      if (!lineupName) return;
      const duplicateLineup = teamLineups?.find(
        (lineup) => lineup.name === lineupName
      );
      if (duplicateLineup) return;

      try {
        const { data } = await axiosPrivate.post(`teams/${teamId}/lineups`, {
          name: lineupName,
          athletes: trimActiveLineup(activeLineup),
        });

        setSelectDefaultValue(data.id);
        setTeamLineups((prevLineups: LineupData[] | null) => {
          return [...prevLineups!, data];
        });

        setValue("activeLineupId", data.id);
        setValue("lineupName", data.name);
      } catch (err: unknown) {
        console.log(err);
      }
    };

    const updateTeamLineup = async () => {
      if (!lineupName) return;
      const duplicateLineup = teamLineups?.find(
        (lineup) => lineup.name === lineupName && lineup.id !== activeLineupId
      );
      if (duplicateLineup) return;

      try {
        const { data } = await axiosPrivate.put(
          `teams/${teamId}/lineups/${activeLineupId}`,
          {
            name: lineupName,
            athletes: trimActiveLineup(activeLineup),
          }
        );

        setTeamLineups((prevLineups: LineupData[] | null) => {
          const updatedLineups: LineupData[] | null = prevLineups;
          updatedLineups?.forEach((lineup) => {
            if (lineup.id === data.lineupId) lineup.name = data.name;
          });

          return [...updatedLineups!];
        });

        setSelectDefaultValue(data.lineupId);
        setValue("activeLineupId", data.lineupId);
        setValue("lineupName", data.name);
      } catch (err: unknown) {
        console.log(err);
      }
    };

    if (activeLineupId !== "new") {
      updateTeamLineup();
    } else {
      createTeamLineup();
    }
  };

  const handleGetSingleLineup = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectDefaultValue(event.target.value);
    if (event.target.value === "new") {
      try {
        setActiveLineup(injectIntoLineup([]));
        setValue("lineupName", "");
        setValue("activeLineupId", "new");
      } catch (err: unknown) {
        console.log(err);
      }
    } else {
      try {
        const { data } = await axiosPrivate.get(
          `/teams/${teamId}/lineups/${event.target.value}`
        );

        setActiveLineup(injectIntoLineup(data.lineups[0].athletes));
        setValue("lineupName", data.lineups[0].name);
        setValue("activeLineupId", data.lineups[0].id);
      } catch (err: unknown) {
        console.log(err);
      }
    }
  };

  const handleDeleteLineup = async () => {
    const deleteSingleLineup = async (lineupId: string) => {
      try {
        await axiosPrivate.delete(`/teams/${teamId}/lineups/${lineupId}`, {
          withCredentials: true,
        });

        setActiveLineup(generatePlaceholderLineup());
        setTeamLineups((prevLineups) =>
          prevLineups!.filter((lineup: LineupData) => lineup.id !== lineupId)
        );

        setValue("activeLineupId", "new");
        setValue("lineupName", "");
      } catch (err: unknown) {
        console.log(err);
      }
    };

    if (getValues().activeLineupId === "new") return;
    deleteSingleLineup(getValues().activeLineupId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isPresent ? { opacity: 1 } : { opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full">
          <div className="flex flex-wrap justify-between items-center desktop:max-w-[1280px] mx-auto my-2 overflow-hidden">
            <div className="mb-2">
              <h1>Lineups</h1>
              <p className="text-black">
                {`Total: ${!teamLineups ? "-" : teamLineups?.length} lineup${
                  teamLineups?.length !== 1 ? `s` : ""
                }`}
              </p>
            </div>
            <div className="flex space-x-2 tablet:space-x-4">
              <button
                onClick={handleSubmit(handleSaveLineup)}
                className={`bg-green-light hover:bg-green-dark border-green-dark text-white p-1 midMobile:p-2 rounded border w-20 midMobile:w-32`}
              >
                Save {width! >= 448 ? "Lineup" : ""}
              </button>
              <div
                onClick={handleDeleteLineup}
                className={`${
                  getValues().activeLineupId === "new"
                    ? "bg-gray-border border-gray-border cursor-not-allowed"
                    : "bg-orange-light hover:bg-orange-dark border-orange-dark cursor-pointer"
                }  text-white p-1 midMobile:p-2 rounded border w-20 midMobile:w-32 text-center`}
              >
                Delete {width! >= 448 ? "Lineup" : ""}
              </div>
            </div>
          </div>

          <form className="flex flex-col midMobile:flex-row p-2 midMobile:pb-0 mb-2 tablet:p-6 midMobile:space-x-4 tablet:space-x-6 desktop:max-w-[1280px] mx-auto bg-white border border-gray-border rounded-t w-full">
            <div className="flex flex-col mb-4 midMobile:w-[50%]">
              <label htmlFor="activeLineupId">
                <h3 className="text-blue-light">Active Lineup</h3>
              </label>
              <select
                {...register("activeLineupId")}
                name="activeLineupId"
                id="activeLineupId"
                value={selectDefaultValue}
                className="px-2 py-3 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
                onChange={handleGetSingleLineup}
              >
                <option disabled>Select lineup</option>
                <option value={"new"}>New lineup</option>
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

            <div className="flex flex-col midMobile:w-[50%]">
              <label htmlFor="lineupName">
                <h3 className="text-blue-light">Lineup Name</h3>
              </label>
              <input
                {...register("lineupName", {
                  required: {
                    value: true,
                    message: "Lineup name field can't be empty!",
                  },
                })}
                type="text"
                id="lineupName"
                name="lineupName"
                placeholder="Input lineup name"
                className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
              />
              {errors.lineupName && (
                <p className="text-red-500">{errors.lineupName.message}</p>
              )}
            </div>
          </form>

          <LineupBoatSection
            width={width}
            rosterAthletes={rosterAthletes}
            activeLineup={activeLineup}
            setActiveLineup={setActiveLineup}
            lineupId={getValues("activeLineupId")}
            isLoading={isLoading}
          />
        </div>
      )}
    </motion.div>
  );
};

export default LineupsPage;
