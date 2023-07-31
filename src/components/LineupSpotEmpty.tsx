interface LineupSpotEmptyProps {
  seat: number;
  position: number;
  athlete: any;
}

const LineupSpotEmpty = ({ seat, position, athlete }: LineupSpotEmptyProps) => {
  //  Drummer and Steers Positions
  return seat === 0 || seat === 11 ? (
    <div className="flex justify-center my-2 items-center bg-gray-border rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20  border">
      <h5 className="text-center text-[2rem] midMobile:text-[2.5rem]">
        {!seat ? "D" : "S"}
      </h5>
    </div>
  ) : (
    <div
      //  target DOM node with ref={setNodeRef}
      className={`${
        position % 2 ? "mx-auto border-r pr-2" : "mx-auto border-l pl-2"
      }  ${seat === 5 && "border-b"} ${
        seat === 6 && "border-t"
      } py-2 border-gray-border`}
    >
      <div
        id={athlete.athletId}
        className="flex justify-center items-center bg-gray-border rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border"
      >
        <h5 className="text-center text-[2rem] midMobile:text-[2.5rem]">
          {position % 2 ? "L" : "R"}
          {seat}
        </h5>
      </div>
    </div>
  );
};

export default LineupSpotEmpty;
