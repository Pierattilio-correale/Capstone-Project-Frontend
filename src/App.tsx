import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/Home";
import MyFooter from "./components/MyFooter";
import ProfileDetails from "./components/ProfileDetails";
import { useState } from "react";
import HomeLogged from "./components/HomeLogged";
import BookDetails from "./components/BookDetails";
import CreazioneCapitolo from "./components/CreazioneCapitolo";
import CapitoloDetails from "./components/CapitoloDetails";
import BookPutOrDelite from "./components/BookPutOrDelite";
import CreaStoria from "./components/CreaStoria";
import ModificaCapitolo from "./components/ModificaCapitolo";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleIsLoggedIn = () => setIsLoggedIn(true);
  const handleIsNotLoggedIn = () => setIsLoggedIn(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <div className="d-flex flex-column min-vh-100">
          <MyNavbar
            handleCloseLogin={handleCloseLogin}
            handleCloseRegister={handleCloseRegister}
            handleShowRegister={handleShowRegister}
            handleShowLogin={handleShowLogin}
            handleIsNotLoggedIn={handleIsNotLoggedIn}
            handleIsLoggedIn={handleIsLoggedIn}
            showLogin={showLogin}
            showRegister={showRegister}
            isLoggedIn={isLoggedIn}
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
                element={<ProfileDetails onLogout={handleLogout} />}
                path="/ProfileDetails/:profileId"
              />
              <Route
                element={<BookDetails />}
                path="/Profile/:profileId/BookDetails/:bookId"
              />
              <Route
                element={<CreaStoria />}
                path="/ProfileDetails/:profileId/CreaStoria/"
              />
              <Route
                element={<CreazioneCapitolo />}
                path="/BookDetails/:bookId/CapitoliDetails/Creation"
              />
              <Route
                element={<BookPutOrDelite />}
                path="/BookPutOrDelite/:bookId"
              />
              <Route
                element={<CapitoloDetails />}
                path="/CapitoloDetails/:capitoloId"
              />
              <Route
                element={<ModificaCapitolo />}
                path="/ProfileDetails/:profileId/BookDetails/:bookId/ModificaCapitolo/:capitoloId"
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
