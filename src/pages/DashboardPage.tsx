import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import PaddleSide from "../charts/PaddleSide";
import Availability from "../charts/Availability";
import Eligibility from "../charts/Eligibility";

const DashboardPage = (): JSX.Element => {
  const { teamId } = useParams();
  const [teamDashboardDetails, setTeamDashboardDetails] = useState<any>(null);
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    try {
      const getTeamDashboardDetails = async () => {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/dashboard`);
        console.log(data);
        setTeamDashboardDetails(data);
      };

      getTeamDashboardDetails();
    } catch (err) {
      console.log(err);
      logoutRedirect("/login");
    }
  }, []);

  return (
    <div className="flex flex-col mx-auto items-center max-w-[448px] text-center my-6">
      <h1>Dashboard</h1>
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
    </div>
  );
};

export default DashboardPage;
