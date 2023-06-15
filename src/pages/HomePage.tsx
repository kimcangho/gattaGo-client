import { Link } from "react-router-dom";

interface HomeProps {
  email: string;
  isLoggedIn: Boolean;
}

const HomePage = ({ email, isLoggedIn }: HomeProps): JSX.Element => {
  // console.log(isLoggedIn);
  return (
    <>
      <Link to="../signup">{email}</Link>
      {isLoggedIn && <p>Logged In</p>}
    </>
  );
};

export default HomePage;
