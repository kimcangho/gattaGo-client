interface SeatProps {
  seat: number;
}

const Seat = ({ seat }: SeatProps) => {
  return (
    <>
      {seat > 0 && seat < 11 ? (
        //  Left and Right Seats
        <div className="flex mx-auto w-fit">
          <div
            className={`mx-auto border-r border-gray-border ${
              seat === 5 && "border-b"
            } ${seat === 6 && "border-t"} py-2 pr-2`}
          >
            <div className="flex justify-center items-center bg-gray-border rounded-xl w-20 h-20 border">
              <h5 className="text-center text-[2.5rem]">L{seat}</h5>
            </div>
          </div>

          <div
            className={`mx-auto border-l ${seat === 5 && "border-b"} ${
              seat === 6 && "border-t"
            } border-gray-border py-2 pl-2`}
          >
            <div className="flex justify-center items-center bg-gray-border rounded-xl w-20 h-20">
              <h5 className="text-center text-[2.5rem]">R{seat}</h5>
            </div>
          </div>
        </div>
      ) : (
        // Drummer / Steers
        <div className="flex justify-center items-center bg-gray-border my-2 w-20 h-20 rounded-xl mx-auto">
          <h5 className="text-center text-[2.5rem]">{!seat ? "D" : "S"}</h5>
        </div>
      )}
    </>
  );
};

export default Seat;
