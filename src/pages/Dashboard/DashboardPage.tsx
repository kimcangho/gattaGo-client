import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, useIsPresent } from "framer-motion";
import useAxiosPrivate from "../../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../../hooks/useLogoutRedirect";
import PaddleSide from "../../charts/PaddleSideDoughnutChart";
import Availability from "../../charts/AvailabilityDoughnutChart";
import Eligibility from "../../charts/EligibilityDoughnutChart";
import Weight from "../../charts/WeightBarChart";
import EmptyAthlete from "../../components/Roster/EmptyAthlete";
import LoadingSpinner from "../../components/General/LoadingSpinner";

const DashboardPage = (): JSX.Element => {
  const { userId, teamId } = useParams();
  const [teamDashboardDetails, setTeamDashboardDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();
  const isPresent = useIsPresent();

  useEffect(() => {
    try {
      const getTeamDashboardDetails = async () => {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/dashboard`);
        setTeamDashboardDetails(data);
        setIsLoading(false);
      };

      getTeamDashboardDetails();
    } catch (err: unknown) {
      console.log(err);
      logoutRedirect("/login");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isPresent ? { opacity: 1 } : { opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : !teamDashboardDetails?.athleteCount ? (
        <EmptyAthlete userId={userId} teamId={teamId} />
      ) : (
        <>
          <h1 className=" text-center mt-8">Dashboard</h1>
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
        </>
      )}
    </motion.div>
  );
};

export default DashboardPage;
