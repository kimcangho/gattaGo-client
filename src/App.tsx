import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import Footer from "./components/Footer";

const App = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen justify-between">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<HomePage email={email} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/signup"
            element={<SignupPage email={email} setEmail={setEmail} />}
          />
          <Route
            path="/login"
            element={
              <LoginPage
                email={email}
                setEmail={setEmail}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/recover_password"
            element={<RecoverPasswordPage email={email} setEmail={setEmail} />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
