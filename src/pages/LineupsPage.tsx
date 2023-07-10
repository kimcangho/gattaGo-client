import { useContext } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";

const LineupsPage = (): JSX.Element => {
  const { teamId } = useParams<string>();
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;

  const { response }: any = useAxios({
    method: "GET",
    url: `/teams/${teamId}/lineups`,
    headers: {
      "Content-Language": "en-US",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  console.log(response);

  return (
    <>
      <div>
        <h2>Lineups</h2>
        {response.id}
      </div>
    </>
  );
};

export default LineupsPage;
