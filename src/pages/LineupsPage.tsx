import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import useAxios from "../hooks/useAxios";
import axios from "axios";
// import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import useRefreshToken from "../hooks/useRefreshToken";

const LineupsPage = (): JSX.Element => {
  const { teamId } = useParams<string>();
  const refresh = useRefreshToken();
  // const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
  //   AuthContext
  // )!;

  //  useAxios custom hook
  // const { response }: any = useAxios({
  //   method: "GET",
  //   url: `/teams/${teamId}/lineups`,
  //   headers: {
  //     "Content-Language": "en-US",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   withCredentials: true,
  // });

  // console.log(response);

  //  Tutorial

  const [lineups, setLineups] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getLineups = async () => {
      try {
        //  use axios
        const { data } = await axios.get(
          `http://localhost:8888/teams/${teamId}/lineups`,
          {
            signal: controller.signal,
          }
        );
        console.log(data);
        isMounted && setLineups(data);
      } catch (err) {
        console.error(err);
      }
    };

    getLineups();

    //  cleanup function
    return () => {
      isMounted = false;  //  remove isMounted state
      controller.abort(); //  remove controller
    }
  }, []);

  return (
    <>
      <div>
        <h2>Lineups</h2>
        <button onClick={() => refresh()}>Refresh</button>
        {/* {response.id} */}
      </div>
    </>
  );
};

export default LineupsPage;
