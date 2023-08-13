import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeightProps {
  weightCountArrOpen: any[];
  weightCountArrWomen: any[];
  avgWeights: any;
}

const Weight = ({ weightCountArrOpen, weightCountArrWomen, avgWeights }: WeightProps) => {

  const weightData = {
    labels: [
      "0-100",
      "100-120",
      "120-140",
      "140-160",
      "160-180",
      "180-200",
      "200-220",
      "220+",
    ],
    datasets: [
      {
        label: "Open",
        data: weightCountArrOpen,
        datalabels: {
          color: "black",
          font: {
            size: 20,
          },
        },
        // backgroundColor: (context: any) => {
        //     console.log(context.chart)
        // }
      },
      {
        label: "Women",
        data: weightCountArrWomen,
        datalabels: {
          color: "black",
          font: {
            size: 20,
          },
        },
        // backgroundColor: (context: any) => {
        //     console.log(context.chart)
        // }
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      datalabels: {
        display: (context: any) => {
          return context.dataset.data[context.dataIndex] === 0 ? false : true;
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full tablet:max-w-[992px] my-2 py-4 border border-black rounded-md shadow-lg bg-white">
      <h2 className="font-bold text-lg midMobile:text-xl tablet:text-2xl desktop:text-3xl">Weight (lbs)</h2>
      {weightCountArrOpen && weightCountArrWomen && <Bar data={weightData} options={options} className="px-2"/>}
    </div>
  );
};

export default Weight;
