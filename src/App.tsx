import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/Home";
import MyFooter from "./components/MyFooter";
import ProfileDetails from "./components/ProfileDetails";
import { useState } from "react";
import HomeLogged from "./components/HomeLogged";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <MyNavbar
            handleCloseLogin={handleCloseLogin}
            handleCloseRegister={handleCloseRegister}
            handleShowRegister={handleShowRegister}
            handleShowLogin={handleShowLogin}
            showLogin={showLogin}
            showRegister={showRegister}
          />
          <main className="flex-grow-1 ">
            <Routes>
              <Route
                element={
                  <Home
                    handleCloseLogin={handleCloseLogin}
                    handleCloseRegister={handleCloseRegister}
                    handleShowRegister={handleShowRegister}
                    handleShowLogin={handleShowLogin}
                  />
                }
                path="/"
              />
              <Route element={<HomeLogged />} path="/home" />
              <Route
                element={<ProfileDetails />}
                path="/ProfileDetails/:profileId"
              />
            </Routes>
          </main>
          <MyFooter />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
