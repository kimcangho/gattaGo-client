import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useWindowSize from "../hooks/useWindowSize";
import checkIcon from "../assets/icons/check.svg";
import clearIcon from "../assets/icons/cube-transparent.svg";
import shareIcon from "../assets/icons/share.svg";
import deleteWhiteIcon from "../assets/icons/delete-white-fill.svg";
import EmptyRaceDay from "../components/EmptyRaceDay";
import RaceSectionItem from "../components/RaceSectionItem";
import RaceOrderItem from "../components/RaceOrderItem";

interface PlanOrderData {
  id: string;
  section: string;
}

const RaceDayPlanBuilderPage = () => {
  const planSections = ["Regatta", "Weather", "Map", "Event", "Lineup", "Note"];
  const [planOrder, setPlanOrder] = useState<PlanOrderData[]>([]);
  const { width } = useWindowSize();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPlanOrder((items) => {
        const oldIndex = items.map((item) => item.id).indexOf(active.id);
        const newIndex = items.map((item) => item.id).indexOf(over.id);
        return [...arrayMove(items, oldIndex, newIndex)];
      });
    }
  };

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
          <div className="flex items-center bg-red-dark text-white p-1 midMobile:p-2 rounded border hover:bg-red-600 cursor-pointer">
            {width! >= 768 && (
              <p className="mr-2 text-lg">Delete {width! >= 1280 && "Plan"}</p>
            )}
            <img src={deleteWhiteIcon} alt="Share Plan" className="h-6" />
          </div>
        </div>
      </div>

      <div className="flex justify-between desktop:max-w-[1280px] mx-auto my-2 overflow-hidden">
        {/* Component Section - Side Panel in mobile, Visible in tablet onwards */}
        <div className="bg-white-dark min-w-[20rem] tablet:w-[30%] hidden tablet:block mr-2">
          <h1>Race Plan</h1>
          {planOrder.length === 0 ? (
            <h2 className="mb-4">
              Select a component below to start building your race plan!
            </h2>
          ) : (
            <>
              <h2>Drag-and-drop to change plan order!</h2>
              <div>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToParentElement, restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={planOrder}
                    strategy={verticalListSortingStrategy}
                  >
                    {planOrder.map((planSection) => {
                      return (
                        <RaceOrderItem
                          key={planSection.id}
                          id={planSection.id}
                          section={planSection.section}
                          setPlanOrder={setPlanOrder}
                        />
                      );
                    })}
                  </SortableContext>
                </DndContext>
              </div>
            </>
          )}

          {/* <h1>Plan Sections</h1> */}
          <h2 className="mt-4">Click a section below to add to your plan!</h2>

          {/* Plan Components */}
          <div className="flex flex-col">
            {planSections.map((planSection, index) => {
              return (
                <RaceSectionItem
                  key={index}
                  section={planSection}
                  setPlanOrder={setPlanOrder}
                />
              );
            })}
          </div>
        </div>

        {/* Plan Section - Viewable/Editable components */}
        <div className="bg-red-light w-full">
          <EmptyRaceDay />
        </div>
      </div>
    </div>
  );
};

export default RaceDayPlanBuilderPage;
