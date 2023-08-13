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
        backgroundColor: ["#9966FE", "#C8CBCF"],
        data: availabilityCountArr,
        datalabels: {
          color: "black",
          font: {
            size: 20,
          },
          display: (context: any) => {
            return context.dataset.data[context.dataIndex] === 0 ? false : true;
          },
        },
      },
    ],
  };

  const options = {
    rotation: 180,
  };

  return (
    <div className="w-full max-w-[448px] tablet:max-w-[320px] m-2 py-4 border border-black rounded-md shadow-lg bg-white">
      <h2 className="font-bold text-lg midMobile:text-xl tablet:text-2xl desktop:text-3xl">
        Availability
      </h2>
      {availabilityCountArr && (
        <Doughnut data={availabilityData} options={options} />
      )}
    </div>
  );
};

export default Availability;
