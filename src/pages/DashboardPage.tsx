import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

const DashboardPage = () => {
  const { teamId } = useParams();
  console.log(teamId);

  const { accessToken }: any = useContext(AuthContext);
  const [currentTeam, setCurrentTeam]: any = useState({});

  //  Get team details - Test
  useEffect(() => {
    const headers = { Authorization: `Bearer ${accessToken}` };

    axios
      .get(`http://localhost:8888/teams/${teamId}`, {
        headers,
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        const { id, name, division, level, gender } = data;
        setCurrentTeam({
          id,
          name,
          division,
          level,
          gender,
        });
      });
  }, []);

  return (
    <div className="px-2">
      <NavBar />
      DashboardPage
      <p>{currentTeam.id}</p>
      <p>{currentTeam.name}</p>
      <p>{currentTeam.division}</p>
      <p>{currentTeam.level}</p>
      <p>{currentTeam.gender}</p>
    </div>
  );
};

export default DashboardPage;
