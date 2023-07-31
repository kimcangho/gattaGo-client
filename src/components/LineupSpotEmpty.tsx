interface LineupSpotEmptyProps {
  seat: number;
}

const LineupSpotEmpty = ({ seat }: LineupSpotEmptyProps) => {
  return seat === 0 || seat === 11 ? (
    <div className="flex justify-center items-center bg-gray-border rounded-xl w-20 h-20 border cursor-grab">
      <h5 className="text-center text-[2.5rem]">{!seat ? "D" : "S"}</h5>
    </div>
  ) : (
    <div className="flex">
      <div className="flex justify-center items-center bg-gray-border rounded-xl w-20 h-20 border">
        <h5 className="text-center text-[2.5rem]">L{seat}</h5>
      </div>
      <div className="flex justify-center items-center bg-gray-border rounded-xl w-20 h-20 border">
        <h5 className="text-center text-[2.5rem]">R{seat}</h5>
      </div>
    </div>
  );
};

export default LineupSpotEmpty;
