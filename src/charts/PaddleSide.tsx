import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PaddleSideProps {
  paddleSideCountArr: any[];
}

const PaddleSide = ({ paddleSideCountArr }: PaddleSideProps) => {
  const paddleSideData = {
    labels: ["Left", "Right", "Both", "None"],
    datasets: [
      {
        data: paddleSideCountArr,
      },
    ],
  };

  return (
    <div className="max-w-[320px] m-2 py-4 border border-black rounded-md shadow-lg">
      <h2>Paddle Side</h2>
      {paddleSideCountArr && <Doughnut data={paddleSideData} />}
    </div>
  );
};

export default PaddleSide;
