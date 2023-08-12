import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface EligibilityProps {
  eligibilityCountArr: any[];
}

const Eligibility = ({ eligibilityCountArr }: EligibilityProps) => {
  const eligibilityData = {
    labels: ["Open", "Women"],
    datasets: [
      {
        data: eligibilityCountArr,
        datalabels: {
          color: "black",
          font: {
            size: 20,
          },
        },
      },
    ],
  };

  return (
    <div className="max-w-[320px] m-2 py-4 border border-black rounded-md shadow-lg">
      <h2>Eligibility</h2>
      {eligibilityCountArr && <Doughnut data={eligibilityData} />}
    </div>
  );
};

export default Eligibility;
