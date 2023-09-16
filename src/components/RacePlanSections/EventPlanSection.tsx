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
  setEventSectionArr: Function;
}

const EventPlanSection = ({
  id,
  setEventSectionArr,
}: EventPlanSectionProps) => {
  const [eventName, setEventName] = useState<string>("");
  const [distance, setDistance] = useState<string>("default");
  const [lane, setLane] = useState<string>("");
  const [startTime, setStartTime] = useState<Date | null>(null);

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
          eventTime: startTime,
        },
      ];
    });
  };

  return (
    <div className="flex flex-col border border-black rounded-md p-2 text-center tablet:text-left">
      <input
        placeholder="Type event name here"
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
          <label htmlFor="startTime">
            <h3 className="text-blue-light px-2">Start Time</h3>
          </label>

          <DatePicker
            isClearable
            showTimeSelectOnly
            timeCaption="Time"
            dateFormat="hh:mm aa"
            placeholderText="Select time"
            showTimeInput
            name="startDate"
            id="startDate"
            selected={startTime}
            onChange={(date: Date) => setStartTime(date)}
            className="bg-inherit p-2 w-full text-black text-center cursor-pointer"
          />
        </div>

        {/* Distance */}
        <div className="flex flex-col my-2 w-full">
          <label htmlFor="distance">
            <h3 className="text-blue-light text-center">Distance</h3>
          </label>
          <select
            name="distance"
            id="distance"
            
            value={distance}
            className={`p-2 text-md text-center bg-inherit border rounded ${
              distance !== "default" && "text-black"
            } focus:outline-blue-light`}
            onChange={(event) => {
              setDistance(event.target.value);
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
          <label htmlFor="lane">
            <h3 className="text-blue-light text-center">Lane</h3>
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
            className={`bg-inherit p-2 w-full text-center ${
              lane ? "text-black" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPlanSection;
