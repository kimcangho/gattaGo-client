import { Link } from "react-router-dom";
import TestButton from "../components/TestButton";

interface HomeProps {
  email: string;
  isLoggedIn: Boolean;
}

const HomePage = ({ email, isLoggedIn }: HomeProps): JSX.Element => {
  return (
    <>
      <Link to="../signup">{email}</Link>
      {isLoggedIn && <p>Logged In</p>}
      <TestButton />
    </>
  );
};

export default HomePage;
