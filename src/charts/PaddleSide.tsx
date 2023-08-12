import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PaddleSideProps {
  paddleSideCountArr: any[];
}

const PaddleSide = ({ paddleSideCountArr }: PaddleSideProps) => {
  const paddleSideData = {
    labels: ["Left", "Right", "Both", "None"],
    datasets: [
      {
        data: paddleSideCountArr,
        datalabels: {
          color: "black",
          font: {
            size: 20,
          },
        },
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
      },
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="max-w-[320px] m-2 py-4 border border-black rounded-md shadow-lg">
      <h2>Paddle Side</h2>
      {paddleSideCountArr && (
        <Doughnut data={paddleSideData} options={options} />
      )}
    </div>
  );
};

export default PaddleSide;
