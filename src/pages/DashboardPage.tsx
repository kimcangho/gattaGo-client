import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import constructionCrane from "../assets/images/construction-crane.svg";

const DashboardPage = (): JSX.Element => {
  const { teamId } = useParams();
  const [teamName, setTeamName] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    try {
      const getTeamDetails = async () => {
        const { data } = await axiosPrivate.get(`/teams/${teamId}`);
        const { team } = data;
        setTeamName(team.name);
      };
      getTeamDetails();
    } catch (err) {
      console.log(err);
      logoutRedirect("/login");
    }
  }, []);

  return (
    <div className="flex flex-col mx-auto items-center max-w-[448px] text-center my-6">
      <h2 className="mb-4">
        Oops! {teamName} dashboard under construction...
        <br />
        Please check back soon!
      </h2>
      <img
        src={constructionCrane}
        alt="Under Construction Crane"
        className="w-[70%] opacity-75"
      />
    </div>
  );
};

export default DashboardPage;
