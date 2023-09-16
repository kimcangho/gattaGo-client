import { useState } from "react";

interface EventSectionData {
  id: string;
  eventName: string;
  eventDistance: string;
  eventLane: string;
  eventLineup: string;
  eventTime: string;
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
  const [startTime, setStartTime] = useState<string>("");

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
          eventStartTime: startTime,
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
      <div className="flex flex-col tablet:flex-row">
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

          {/* Start Time */}
          <div className="flex flex-col my-2">
            <label htmlFor="startTime">
              <h3 className="text-blue-light">Start Time</h3>
            </label>
            <input
              placeholder="Type email address here"
              name="startTime"
              id="startTime"
              value={startTime}
              onChange={(event) => {
                setStartTime(event.target.value);
                handleSetEventSection();
              }}
              className={`bg-inherit p-2 w-full ${startTime ? "text-black" : ""}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPlanSection;
