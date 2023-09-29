import { useRef, useState, useEffect } from "react";
import { MapSectionData } from "../../interfaces/RacePlanData";
import axios from "axios";

import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapPlanGeocoder from "./MapPlanGeocoder";

interface MapPlanSectionProps {
  id: string;
  mapSection?: MapSectionData;
  setMapSectionArr: Function;
}

const MapPlanSection = ({
  id,
  mapSection,
  setMapSectionArr,
}: MapPlanSectionProps) => {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const [mapName, setMapName] = useState<string>(mapSection?.mapName || "");
  const [mapLongitude, setMapLongitude] = useState<number | null>(
    mapSection?.mapLongitude || null
  );
  const [mapLatitude, setMapLatitude] = useState<number | null>(
    mapSection?.mapLatitude || null
  );
  const [mapZoom, setMapZoom] = useState<number>(mapSection?.mapZoom || 10);

  const mapRef = useRef();

  useEffect(() => {
    const getIPAddress = async () => {
      if (!mapLongitude && !mapLatitude) {
        const { data } = await axios.get("https://ipapi.co/json");

        //@ts-ignore
        mapRef.current.flyTo({
          center: [data.longitude, data.latitude],
        });
        setMapLongitude(data.longitude);
        setMapLatitude(data.latitude);
      }
    };

    getIPAddress();
  }, []);

  const handleSetMapSection = () => {
    setMapSectionArr((currentArr: MapSectionData[]) => {
      const filteredArr = currentArr.filter(
        (mapSection: MapSectionData) => mapSection.id !== id
      );
      return [
        ...filteredArr,
        {
          id,
          mapName,
          mapLongitude,
          mapLatitude,
          mapZoom,
        },
      ];
    });
  };

  return (
    <div className="flex flex-col w-full h-80 border-black border rounded-md p-2">
      <input
        placeholder="Type map title here"
        value={mapName}
        onChange={(event) => {
          setMapName(event.target.value);
          handleSetMapSection();
        }}
        className={`bg-inherit text-2xl p-2 mb-2 w-full ${
          mapName ? "text-black" : ""
        }`}
      />
      <ReactMapGL
        //@ts-ignore
        ref={mapRef}
        mapboxAccessToken={accessToken}
        initialViewState={{
          longitude: mapLongitude,
          latitude: mapLatitude,
          zoom: mapZoom,
        }}
        mapStyle={"mapbox://styles/mapbox/streets-v12"}
        onZoom={(event) => {
          setMapZoom(event.viewState.zoom);
          handleSetMapSection();
        }}
      >
        <Marker
          latitude={mapLatitude}
          longitude={mapLongitude}
          draggable
          onDragEnd={async (event) => {
            setMapLongitude(event.lngLat.lng);
            setMapLatitude(event.lngLat.lat);
            handleSetMapSection();
          }}
        />
        <NavigationControl position="bottom-right" showCompass={false} />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(event) => {
            setMapLongitude(event.coords.longitude);
            setMapLatitude(event.coords.latitude);
            handleSetMapSection();
          }}
        />
        <MapPlanGeocoder
          accessToken={accessToken}
          setMapLongitude={setMapLongitude}
          setMapLatitude={setMapLatitude}
          handleSetMapSection={handleSetMapSection}
        />
      </ReactMapGL>
    </div>
  );
};

export default MapPlanSection;
