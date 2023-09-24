import { MapSectionData } from "../../interfaces/RacePlanData";

interface MapPlanSectionProps {
  id: string;
  mapSection: MapSectionData[];
  setMapSectionArr: Function;
}

const MapPlanSection = ({
  id,
  mapSection,
  setMapSectionArr,
}: MapPlanSectionProps) => {
  return (
    <>
      <div>Map Section: {id}</div>
      
    </>
  );
};

export default MapPlanSection;
