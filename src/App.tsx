import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";

const App = (): JSX.Element => {
  const [email, setEmail] = useState("");

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage email={email} setEmail={setEmail} />}
        />
        <Route
          path="/signup"
          element={<SignupPage email={email} setEmail={setEmail} />}
        />
        <Route
          path="/login"
          element={<LoginPage email={email} setEmail={setEmail} />}
        />
        <Route
          path="/recover_password"
          element={<RecoverPasswordPage email={email} setEmail={setEmail} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
