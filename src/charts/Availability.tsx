import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AvailabilityProps {
  availabilityCountArr: any[];
}

const Availability = ({ availabilityCountArr }: AvailabilityProps) => {
  const availabilityData = {
    labels: ["Available", "Unavailable"],
    datasets: [
      {
        data: availabilityCountArr,
      },
    ],
  };

  return (
    <div className="max-w-[320px] m-2 py-4 border border-black rounded-md shadow-lg">
      <h2>Availability</h2>
      {availabilityCountArr && <Doughnut data={availabilityData} />}
    </div>
  );
};

export default Availability;
