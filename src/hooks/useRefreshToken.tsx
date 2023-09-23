// import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
// import { useContext } from "react";
// import { axiosAuth } from "../services/axios.service";

// const useRefreshToken = () => {
//   const { setAccessToken }: AuthContextTypes = useContext(AuthContext)!;

//   const refresh = async () => {
//     try {
//       const { data } = await axiosAuth.get("/refresh");

//       setAccessToken(data.accessToken);
//       return data.accessToken;
//     } catch (err: unknown) {
//       console.log(err);
//     }
//   };

//   return refresh;
// };

// export default useRefreshToken;
