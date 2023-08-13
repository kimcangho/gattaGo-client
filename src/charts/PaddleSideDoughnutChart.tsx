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
    labels: ["Left", "Both", "Right", "None"],
    datasets: [
      {
        backgroundColor: ["#36A2EB", "#4BC0C0", "#FFCD56", "#C8CBCF"],
        data: paddleSideCountArr,
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
    plugins: {
      datalabels: {
        display: true,
      },
      legend: {
        display: true,
      },
    },
    rotation: 180
  };

  return (
    <div className="w-full max-w-[448px] tablet:max-w-[320px] m-2 py-4 border border-black rounded-md shadow-lg bg-white">
      <h2 className="font-bold text-lg midMobile:text-xl tablet:text-2xl desktop:text-3xl">
        Paddle Side
      </h2>
      {paddleSideCountArr && (
        <Doughnut data={paddleSideData} options={options}/>
      )}
    </div>
  );
};

export default PaddleSide;
