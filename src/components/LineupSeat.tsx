interface TestSeatProps {
  seat: number;
  row?: any[];
}

const LineupSeat = ({ seat, row }: TestSeatProps) => {
  return (
    <div className="flex mx-auto w-fit">
      {row ? (
        row.map(({ athlete, position }: any) => {
          return (
            <div key={position}>
              {!athlete?.length && (seat === 0 || seat === 11) ? (
                <>
                  {athlete.isEmpty ? (
                    <div className="flex justify-center items-center bg-gray-border my-2 w-20 h-20 rounded-xl mx-auto">
                      <h5 className="text-center text-[2.5rem]">
                        {!seat ? "D" : "S"}
                      </h5>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center bg-blue-wavy text-black my-2 w-20 h-20 rounded-xl mx-auto relative">
                      <div className="bg-gray-border w-4 h-4 absolute top-1 left-1 flex items-center justify-center rounded-full">
                        <p>
                          {athlete.paddleSide && athlete.paddleSide === "N/A"
                            ? "N"
                            : athlete.paddleSide && athlete.paddleSide}
                        </p>
                      </div>
                      <div className="bg-green-light w-4 h-4 absolute top-1 right-1 flex items-center justify-center rounded-full">
                        <p>{athlete.eligibility}</p>
                      </div>
                      <h5 className="text-center text-[2.5rem]">
                        {athlete.firstName.charAt(0) +
                          athlete.lastName.charAt(0)}
                      </h5>
                      <div className="bg-orange-light w-fit h-fit px-2 absolute bottom-0.5 flex items-center justify-center rounded-full text-xs">
                        <p>{athlete.weight}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className={`${
                    position % 2
                      ? "mx-auto border-r pr-2"
                      : "mx-auto border-l pl-2"
                  }  ${seat === 5 && "border-b"} ${
                    seat === 6 && "border-t"
                  } py-2 border-gray-border`}
                >
                  {athlete.isEmpty ? (
                    <div className="flex justify-center items-center bg-gray-border rounded-xl w-20 h-20 border">
                      <h5 className="text-center text-[2.5rem]">
                        {position % 2 ? "L" : "R"}
                        {seat}
                      </h5>
                    </div>
                  ) : (
                    <div className="flex relative justify-center items-center bg-blue-wavy rounded-xl w-20 h-20 border text-black">
                      <div className="bg-gray-border w-4 h-4 absolute top-1 left-1 flex items-center justify-center rounded-full">
                        <p>
                          {athlete.paddleSide === "N/A"
                            ? "N"
                            : athlete.paddleSide}
                        </p>
                      </div>
                      <div className="bg-green-light w-4 h-4 absolute top-1 right-1 flex items-center justify-center rounded-full">
                        <p>{athlete.eligibility}</p>
                      </div>
                      <h5 className="text-center text-[2.5rem]">
                        {athlete.firstName.charAt(0) +
                          athlete.lastName.charAt(0)}
                      </h5>
                      <div className="bg-orange-light w-fit h-fit px-2 absolute bottom-0.5 flex items-center justify-center rounded-full text-xs">
                        <p>{athlete.weight}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : seat === 0 || seat === 11 ? (
        <div className="flex justify-center items-center bg-gray-border rounded-xl w-20 h-20 border">
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
      )}
    </div>
  );
};

export default LineupSeat;
