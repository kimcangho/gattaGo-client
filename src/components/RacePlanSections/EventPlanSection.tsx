import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPrivate from "../../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../../hooks/useLogoutRedirect";
import { LineupData } from "../../interfaces/EntityData";

interface EventSectionData {
  id: string;
  eventName: string;
  eventDistance: string;
  eventLane: string;
  eventLineup: string;
  eventTime: Date;
}

interface EventPlanSectionProps {
  section: string;
  id: string;
  setEventSectionArr: Function;
}

const EventPlanSection = ({
  id,
  setEventSectionArr,
}: EventPlanSectionProps) => {
  const [eventName, setEventName] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [lane, setLane] = useState<string>("");
  const [lineup, setLineup] = useState<string>("");
  const [startTime, setStartTime] = useState<Date | null>(null);

  //  Fetch API call
  const [teamLineups, setTeamLineups] = useState<LineupData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { teamId } = useParams<string>();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    const getTeamLineups = async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosPrivate.get(`/teams/${teamId}/lineups`);
        console.log(data)
        setTeamLineups(data.lineups);
      } catch (err: unknown) {
        console.log(err);
        logoutRedirect("/login");
      } finally {
        setIsLoading(false);
      }
    };

    getTeamLineups();
  }, []);

  const handleSetEventSection = () => {
    setEventSectionArr((currentArr: EventSectionData[]) => {
      const filteredArr = currentArr.filter(
        (eventSection: EventSectionData) => eventSection.id !== id
      );
      return [
        ...filteredArr,
        {
          id,
          eventName,
          eventDistance: distance,
          eventLane: lane,
          eventLineup: lineup,
          eventTime: startTime,
        },
      ];
    });
  };

  return (
    <div className="flex flex-col border border-black rounded-md p-2">
      <input
        placeholder="Type event name here"
        onChange={(event) => {
          setEventName(event.target.value);
          handleSetEventSection();
        }}
        className={`bg-inherit text-2xl p-2 ${eventName ? "text-black" : ""}`}
      />
      <div className="flex flex-col midMobile:flex-row">
        {/* Event Details */}
        <div className="mx-2 w-full">
          {/* Distance */}
          <div className="flex flex-col my-2">
            <label htmlFor="distance">
              <h3 className="text-blue-light">Distance</h3>
            </label>
            <input
              placeholder="Type distance here"
              name="distance"
              id="distance"
              value={distance}
              onChange={(event) => {
                setDistance(event.target.value);
                handleSetEventSection();
              }}
              className={`bg-inherit p-2 w-full ${
                distance ? "text-black" : ""
              }`}
            />
          </div>
          {/* Lane */}
          <div className="flex flex-col my-2">
            <label htmlFor="lane">
              <h3 className="text-blue-light">Lane</h3>
            </label>
            <input
              placeholder="Type lane here"
              name="lane"
              id="lane"
              value={lane}
              onChange={(event) => {
                setLane(event.target.value);
                handleSetEventSection();
              }}
              className={`bg-inherit p-2 w-full ${lane ? "text-black" : ""}`}
            />
          </div>
        </div>
        <div className="mx-2 w-full">
          {/* Start Time */}
          <div className="flex flex-col my-2">
            <label htmlFor="startTime">
              <h3 className="text-blue-light">Start Time</h3>
            </label>

            <DatePicker
              isClearable
              showTimeSelectOnly
              timeCaption="Time"
              dateFormat="hh:mm aa"
              placeholderText="Select event Time"
              showTimeInput
              name="startDate"
              id="startDate"
              selected={startTime}
              onChange={(date: Date) => setStartTime(date)}
              className="bg-inherit p-2 w-full text-black"
            />
          </div>
          {/* Lineup */}
          <div className="flex flex-col my-2">
            <label htmlFor="lineup">
              <h3 className="text-blue-light">Lineup</h3>
            </label>
            <input
              placeholder="Type lineup here"
              name="lineup"
              id="lineup"
              value={lineup}
              onChange={(event) => {
                setLineup(event.target.value);
                handleSetEventSection();
              }}
              className={`bg-inherit p-2 w-full ${lineup ? "text-black" : ""}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPlanSection;
