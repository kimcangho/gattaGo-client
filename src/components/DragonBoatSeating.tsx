import Seat from "./Seat";
import { dragonBoatArr } from "../data/dragonBoatArr";

const DragonBoatSeating = () => {
  return (
    <div className="desktop:max-w-[1280px] mx-auto bg-white border rounded-md border-gray-border">
      <h1 className="text-center">Boat Order</h1>
      <div>
        {dragonBoatArr.map((_row: number, index: number) => {
          return <Seat key={index} seat={index} />;
        })}
      </div>
    </div>
  );
};

export default DragonBoatSeating;
