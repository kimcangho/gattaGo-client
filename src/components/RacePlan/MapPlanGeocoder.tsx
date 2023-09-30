//@ts-ignore
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useControl } from "react-map-gl";

interface MapPlanGeocoderProps {
  accessToken: string;
  setMapLongitude: Function;
  setMapLatitude: Function;
  handleSetMapSection: Function;
}

const MapPlanGeocoder = ({
  accessToken,
  setMapLongitude,
  setMapLatitude,
  handleSetMapSection,
}: MapPlanGeocoderProps) => {
  const ctrl = new MapBoxGeocoder({
    accessToken,
    marker: false,
    collapsed: true,
  });

  useControl(() => ctrl);
  ctrl.on("result", (event: any) => {
    const coords = event.result.geometry.coordinates;
    setMapLongitude(coords[0]);
    setMapLatitude(coords[1]);
    handleSetMapSection();
  });

  return null;
};

export default MapPlanGeocoder;
