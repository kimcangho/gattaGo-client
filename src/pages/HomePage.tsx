import { Link } from "react-router-dom";

interface HomeProps {
  email: string;
  setEmail: Function;
}

const HomePage = ({ email }: HomeProps): JSX.Element => {
  return <Link to="../signup">{email}</Link>;
};

export default HomePage;
