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
import annotationPlugin from "chartjs-plugin-annotation";
import useWindowSize from "../hooks/useWindowSize";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface WeightProps {
  weightCountArrOpen: any[];
  weightCountArrWomen: any[];
  avgWeights: any;
}

const Weight = ({
  weightCountArrOpen,
  weightCountArrWomen,
  avgWeights,
}: WeightProps) => {
  const { avgWeight, avgOpenWeight, avgWomenWeight } = avgWeights;
  const { width } = useWindowSize();

  const teamAnnotation = {
    type: "line",
    display: avgWomenWeight ? true : false,
    scaleID: "x",
    borderWidth: width! < 768 ? 1.5 : 3,
    borderColor: "#4BC0C0",
    position: "start",
    value: (context: any) => {
      if (avgWeight === 0) return;
      if (avgWeight < 100) return -0.5 + avgWeight / 100;
      if (avgWeight >= 100 && avgWeight < 220)
        return 0.5 + ((avgWeight - 100) / 120) * 6;
      if (avgWeight >= 220) return context.chart.scales.x.max;
    },
    label: {
      content: ["Team Avg", `${Math.round(avgWeight)} lbs`],
      display: false,
      drawTime: "afterDatasetsDraw",
      position: "start",
      font: {
        size: width! < 448 ? 8 : width! < 768 ? 10 : 12,
      },
    },
    enter({ element }: any) {
      element.label.options.display = true;
      return true;
    },
    leave({ element }: any) {
      element.label.options.display = false;
      return true;
    },
  };

  const openAnnotation = {
    type: "line",
    display: avgOpenWeight ? true : false,
    scaleID: "x",
    borderWidth: width! < 768 ? 1.5 : 3,
    borderColor: "#36A2EB",
    position: "start",
    value: (context: any) => {
      if (avgOpenWeight === 0) return;
      if (avgOpenWeight < 100) return -0.5 + avgOpenWeight / 100;
      if (avgOpenWeight >= 100 && avgOpenWeight < 220)
        return 0.5 + ((avgOpenWeight - 100) / 120) * 6;
      if (avgOpenWeight >= 220) return context.chart.scales.x.max;
    },
    label: {
      content: ["Open Avg", `${Math.round(avgOpenWeight)} lbs`],
      display: false,
      drawTime: "afterDatasetsDraw",
      position: "start",
      font: {
        size: width! < 448 ? 8 : width! < 768 ? 10 : 12,
      },
    },
    enter({ element }: any) {
      element.label.options.display = true;
      return true;
    },
    leave({ element }: any) {
      element.label.options.display = false;
      return true;
    },
  };

  const womenAnnotation = {
    type: "line",
    display: avgWomenWeight ? true : false,
    scaleID: "x",
    borderWidth: width! < 768 ? 1.5 : 3,
    borderColor: "#FF6484",
    position: "start",
    value: (context: any) => {
      if (avgWomenWeight === 0) return;
      if (avgWomenWeight < 100) return -0.5 + avgWomenWeight / 100;
      if (avgWomenWeight >= 100 && avgWomenWeight < 220)
        return 0.5 + ((avgWomenWeight - 100) / 120) * 6;
      if (avgWomenWeight >= 220) return context.chart.scales.x.max;
    },
    label: {
      content: ["Women Avg", `${Math.round(avgWomenWeight)} lbs`],
      display: false,
      drawTime: "afterDatasetsDraw",
      position: "start",
      font: {
        size: width! < 448 ? 8 : width! < 768 ? 10 : 12,
      },
    },
    enter({ element }: any) {
      element.label.options.display = true;
      return true;
    },
    leave({ element }: any) {
      element.label.options.display = false;
      return true;
    },
  };

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
            size: width! < 448 ? 8 : width! < 768 ? 12 : 20,
          },
        },
      },
      {
        label: "Women",
        data: weightCountArrWomen,
        datalabels: {
          color: "black",
          font: {
            size: width! < 448 ? 8 : width! < 768 ? 12 : 20,
          },
        },
      },
    ],
  };

  const options = {
    aspectRatio: 1.75,
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
        enabled: false,
      },
      annotation: {
        annotations: {
          teamAnnotation,
          openAnnotation,
          womenAnnotation,
        },
      },
    },
  };

  return (
    <div className="w-full tablet:max-w-[992px] my-2 py-4 border border-black rounded-md shadow-lg bg-white">
      <h2 className="font-bold text-lg midMobile:text-xl tablet:text-2xl desktop:text-3xl">
        Weight (lbs)
      </h2>
      {weightCountArrOpen && weightCountArrWomen && (
        //  @ts-ignore
        <Bar data={weightData} options={options} className="px-2" />
      )}
    </div>
  );
};

export default Weight;
