import { MapSectionData } from "../../interfaces/RacePlanData";

import ReactMapGL from "react-map-gl";

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
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  console.log(import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);
  // console.log(accessToken);
  return (
    <div className="relative">
      <div>Map Section: {id}</div>
      {/* <div className="h-[400px] relative">
      </div> */}

      {/* <ReactMapGL mapboxAccessToken={accessToken}></ReactMapGL> */}
    </div>
  );
};

export default MapPlanSection;
