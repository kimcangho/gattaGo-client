import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface EventSectionData {
  id: string;
  eventName: string;
  eventDistance: string;
  eventLane: string;
  eventTime: Date;
}

interface EventPlanSectionProps {
  id: string;
  eventSection?: EventSectionData;
  setEventSectionArr: Function;
}

const EventPlanSection = ({
  id,
  eventSection,
  setEventSectionArr,
}: EventPlanSectionProps) => {
  const [eventName, setEventName] = useState<string>(
    eventSection?.eventName || ""
  );
  const [eventDistance, setEventDistance] = useState<string>(
    eventSection?.eventDistance || "default"
  );
  const [eventLane, setEventLane] = useState<string>(
    eventSection?.eventLane || ""
  );
  const [eventTime, setEventTime] = useState<Date | null>(
    eventSection?.eventTime ? new Date(eventSection?.eventTime) : null
  );

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
          eventDistance,
          eventLane,
          eventTime,
        },
      ];
    });
  };

  return (
    <div className="flex flex-col bg-white shadow-md rounded-md p-2 text-center tablet:text-left">
      <input
        placeholder="Type event name here"
        value={eventName}
        onChange={(event) => {
          setEventName(event.target.value);
          handleSetEventSection();
        }}
        className={`bg-inherit text-center tablet:text-left text-2xl p-2 ${
          eventName ? "text-black" : ""
        }`}
      />
      <div className="flex flex-col midMobile:flex-row midMobile:space-x-2 ">
        {/* Event Details */}

        {/* Start Time */}
        <div className="flex flex-col my-2 w-full text-center">
          <label htmlFor="eventTime">
            <h3 className="text-blue-light px-2">Start Time</h3>
          </label>

          <DatePicker
            isClearable
            showTimeSelectOnly
            timeCaption="Time"
            dateFormat="hh:mm aa"
            placeholderText="Select time"
            showTimeInput
            name="eventTime"
            id="eventTime"
            selected={eventTime}
            onChange={(date: Date) => setEventTime(date)}
            className="bg-inherit p-2 w-full text-black text-center cursor-pointer"
          />
        </div>

        {/* Distance */}
        <div className="flex flex-col my-2 w-full">
          <label htmlFor="eventDistance">
            <h3 className="text-blue-light text-center">Distance</h3>
          </label>
          <select
            name="eventDistance"
            id="eventDistance"
            value={eventDistance}
            className={`p-2 text-md text-center bg-inherit border rounded ${
              eventDistance !== "default" && "text-black"
            } focus:outline-blue-light`}
            onChange={(event) => {
              setEventDistance(event.target.value);
              handleSetEventSection();
            }}
            placeholder="Select Distance"
          >
            <option disabled value="default">
              Select Distance
            </option>
            <option value="200m">200m</option>
            <option value="500m">500m</option>
            <option value="1000m">1000m</option>
            <option value="2000m">2000m</option>
          </select>
        </div>

        {/* Lane */}
        <div className="flex flex-col my-2 w-full">
          <label htmlFor="eventLane">
            <h3 className="text-blue-light text-center">Lane</h3>
          </label>
          <input
            placeholder="Type lane here"
            name="eventLane"
            id="eventLane"
            value={eventLane}
            onChange={(event) => {
              setEventLane(event.target.value);
              handleSetEventSection();
            }}
            className={`bg-inherit p-2 w-full text-center ${
              eventLane ? "text-black" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPlanSection;
