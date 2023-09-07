import { useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import verticalDragIcon from "../assets/icons/vert-drag.svg";
import checkIcon from "../assets/icons/check.svg";
import clearIcon from "../assets/icons/cube-transparent.svg";
import shareIcon from "../assets/icons/share.svg";
import deleteIcon from "../assets/icons/delete.svg";

const RaceDayPlanBuilderPage = () => {
  const [planTemplate, setPlanTemplate] = useState<string[]>([]);
  const { width } = useWindowSize();

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between items-center desktop:max-w-[1280px] mx-auto my-2 overflow-hidden">
        <div className="mb-2">
          <h1>Race Day</h1>
          {/* Hardcoded plan number */}
          <p className="text-black">{`Total: 0 Plans`}</p>
        </div>
        <div className="flex space-x-2 tablet:space-x-4 text-center">
          {/* Save Plan Button  */}
          <div className="flex items-center bg-green-light text-white p-1 midMobile:p-2 rounded border hover:bg-green-dark cursor-pointer">
            {width! >= 768 && (
              <p className="mr-2 text-lg">Save {width! >= 1280 && "Plan"}</p>
            )}
            <img src={checkIcon} alt="Save Plan" className="h-6" />
          </div>

          {/* Clear Plan Button  */}
          <div className="flex items-center bg-orange-light text-white p-1 midMobile:p-2 rounded border hover:bg-orange-dark cursor-pointer">
            {width! >= 768 && (
              <p className="mr-2 text-lg">Clear {width! >= 1280 && "Plan"}</p>
            )}
            <img src={clearIcon} alt="Clear Plan" className="h-6" />
          </div>

          {/* Share Plan Button  */}
          <div className="flex items-center bg-blue-light text-white p-1 midMobile:p-2 rounded border hover:bg-blue-dark cursor-pointer">
            {width! >= 768 && (
              <p className="mr-2 text-lg">Share {width! >= 1280 && "Plan"}</p>
            )}
            <img src={shareIcon} alt="Share Plan" className="h-6" />
          </div>

          {/* Delete Plan Button  */}
          <div className="flex items-center bg-red-dark text-white p-1 midMobile:p-2 rounded border hover:bg-red-light cursor-pointer">
            {width! >= 768 && (
              <p className="mr-2 text-lg">Delete {width! >= 1280 && "Plan"}</p>
            )}
            <img src={deleteIcon} alt="Share Plan" className="h-6" />
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
