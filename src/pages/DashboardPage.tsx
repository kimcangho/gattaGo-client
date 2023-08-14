import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import PaddleSide from "../charts/PaddleSideDoughnutChart";
import Availability from "../charts/AvailabilityDoughnutChart";
import Eligibility from "../charts/EligibilityDoughnutChart";
import Weight from "../charts/WeightBarChart";

const DashboardPage = (): JSX.Element => {
  const { userId, teamId } = useParams();
  const [teamDashboardDetails, setTeamDashboardDetails] = useState<any>(null);
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    try {
      const getTeamDashboardDetails = async () => {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/dashboard`);
        setTeamDashboardDetails(data);
      };

      getTeamDashboardDetails();
    } catch (err) {
      console.log(err);
      logoutRedirect("/login");
    }
  }, []);

  return (
    <>
      {!teamDashboardDetails?.athleteCount ? (
        <div className="tablet:w-[448px] mx-auto">
          <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
            Oops! Looks like we're fresh out of paddlers...
          </h3>
          <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
            Time to create a new paddler{" "}
            <span>
              <Link
                to={`../${userId}/roster/${teamId}/new`}
                className="underline decoration-2 text-green-light hover:text-green-dark"
              >
                here!
              </Link>
            </span>
          </h3>
        </div>
      ) : (
        <div className="flex flex-col tablet:flex-row tablet:flex-wrap mx-auto tablet:justify-center items-center max-w-[448px] tablet:max-w-full desktop:max-w-[1280px] text-center my-6">
          {teamDashboardDetails?.paddleSideCountArr && (
            <PaddleSide
              paddleSideCountArr={teamDashboardDetails.paddleSideCountArr}
            />
          )}
          {teamDashboardDetails?.availabilityCountArr && (
            <Availability
              availabilityCountArr={teamDashboardDetails.availabilityCountArr}
            />
          )}
          {teamDashboardDetails?.eligibilityCountArr && (
            <Eligibility
              eligibilityCountArr={teamDashboardDetails.eligibilityCountArr}
            />
          )}
          {teamDashboardDetails?.weightCountArrOpen &&
            teamDashboardDetails?.weightCountArrWomen && (
              <Weight
                weightCountArrOpen={teamDashboardDetails.weightCountArrOpen}
                weightCountArrWomen={teamDashboardDetails.weightCountArrWomen}
                avgWeights={teamDashboardDetails.avgWeights}
              />
            )}
        </div>
      )}
    </>
  );
};

export default DashboardPage;
