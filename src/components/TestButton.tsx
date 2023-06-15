import axios from "axios";

//  ***     IMPORTANT: This button currently used to test API calls!    ***

// type Props = {};

const TestButton = () => {
  const testRequest = async () => {
    console.log("Testing axios request...");
    const {data} = await axios.post("http://localhost:7777/token", {
      email: "test@email.com",
      password: "password",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiaWF0IjoxNjg2NzU1MTM3fQ._FoYLBYMYC1TBCNLv6C2RW7nt0nHfHjW7Tptn3JP140"
    });
    console.log(data);
  };

  return <div onClick={testRequest}>TestButton</div>;
};

export default TestButton;
