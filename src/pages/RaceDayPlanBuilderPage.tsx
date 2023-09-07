import { useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import verticalDragIcon from "../assets/icons/vert-drag.svg";

const RaceDayPlanBuilderPage = () => {
  const [planTemplate, setPlanTemplate] = useState<string[]>([]);
  const { width } = useWindowSize();

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between items-center desktop:max-w-[1280px] mx-auto my-2 overflow-hidden">
        <div className="mb-2">
          <h1>Race Day Plans</h1>
          <p className="text-black">
            {/* {`Total: ${!teamLineups ? "-" : teamLineups?.length} lineup${
            teamLineups?.length !== 1 ? `s` : ""
          }`} */}
          </p>
        </div>
        <div className="flex space-x-2 tablet:space-x-4 text-center">
          {/* Save Plan Button  */}
          <div className="bg-green-light text-white p-1 midMobile:p-2 rounded border w-20 midMobile:w-32 hover:bg-green-dark cursor-pointer">
            Save {width! >= 448 ? "Plan" : ""}
          </div>

          {/* Clear Plan Button  */}
          <div className="bg-orange-light text-white p-1 midMobile:p-2 rounded border w-20 midMobile:w-32 hover:bg-orange-dark cursor-pointer">
            Clear {width! >= 448 ? "Plan" : ""}
          </div>

          {/* Export Plan Button  */}
          <div className="bg-blue-light text-white p-1 midMobile:p-2 rounded border w-20 midMobile:w-32 hover:bg-blue-dark cursor-pointer">
            Share {width! >= 448 ? "Plan" : ""}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center desktop:max-w-[1280px] mx-auto my-2 overflow-hidden h-screen">
        {/* Component Section - Side Panel in mobile, Visible in tablet onwards */}
        <div className="bg-white-dark w-[30%] h-full hidden tablet:block">
          <h1 className="m-4">Components</h1>
          <h2 className="mx-4">
            Build your plan by selecting components below!
          </h2>

          {/* Components */}
          <div className="flex flex-col w-full">
            {["Regatta", "Weather", "Map", "Event", "Lineup", "Note"].map(
              (component) => {
                return (
                  <div className="flex justify-between mx-4 px-2 border border-black my-1">
                    <h2>{component}</h2>
                    <img
                      src={verticalDragIcon}
                      alt="Vertical Drag"
                      className="h-4 tablet:h-6"
                    />
                  </div>
                );
              }
            )}

            {/* <div className="mx-4">Weather</div>
            <div className="mx-4">Map</div>
            <div className="mx-4">Event</div>
            <div className="mx-4">Lineup</div>
            <div className="mx-4">Note</div> */}
          </div>
        </div>

        {/* Plan Section - Viewable/Editable components */}
        <div className="bg-red-light w-full h-full">
          <h1 className="m-4">Plan</h1>
        </div>
      </div>
    </div>
  );
};

export default RaceDayPlanBuilderPage;
