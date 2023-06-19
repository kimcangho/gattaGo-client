import axios from "axios";

//  ***     IMPORTANT: This button currently used to test API calls!    ***

// type Props = {};

const TestButton = () => {
  const instance = axios.create({
    withCredentials: true,
  });

  const testRequest = async () => {
    console.log("Testing axios request...");
    const response = await instance.post(
      "http://localhost:7777/token",
      {
        email: "name@email.com",
        password: "password",
        headers: {
          Cookie:
            "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvLmtpbWNhbmdAZ21haWwuY29tIiwiaWF0IjoxNjg3MTQyMjg3fQ.UzkqRD5153oSQLc9uBC_85NUAeQfQKIQ-mOIFuxbhRA",
        },
      },
      { withCredentials: true }
    );
  };

  return <div onClick={testRequest}>TestButton</div>;
};

export default TestButton;
