import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/Home";
import MyFooter from "./components/MyFooter";
import ProfileDetails from "./components/ProfileDetails";
import { useEffect, useState } from "react";
import HomeLogged from "./components/HomeLogged";
import BookDetails from "./components/BookDetails";
import CreazioneCapitolo from "./components/CreazioneCapitolo";
import CapitoloDetails from "./components/CapitoloDetails";
import BookPutOrDelite from "./components/BookPutOrDelite";
import CreaStoria from "./components/CreaStoria";
import ModificaCapitolo from "./components/ModificaCapitolo";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./components/PrivateRoute";
import { Navigate } from "react-router-dom";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      setIsLoggedIn(true);
    }
  }, []);
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
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/home" replace />
                  ) : (
                    <Home
                      handleCloseLogin={handleCloseLogin}
                      handleCloseRegister={handleCloseRegister}
                      handleShowRegister={handleShowRegister}
                      handleShowLogin={handleShowLogin}
                    />
                  )
                }
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <HomeLogged />
                  </PrivateRoute>
                }
              />
              <Route
                element={<ProfileDetails onLogout={handleLogout} />}
                path="/ProfileDetails/:profileId"
              />
              <Route
                element={<BookDetails />}
                path="/Profile/:profileId/BookDetails/:bookId"
              />
              <Route
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <CreaStoria />
                  </PrivateRoute>
                }
                path="/ProfileDetails/:profileId/CreaStoria/"
              />
              <Route
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <CreazioneCapitolo />
                  </PrivateRoute>
                }
                path="/BookDetails/:bookId/CapitoliDetails/Creation"
              />
              <Route
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <BookPutOrDelite />
                  </PrivateRoute>
                }
                path="/BookPutOrDelite/:bookId"
              />
              <Route
                element={<CapitoloDetails />}
                path="/CapitoloDetails/:capitoloId"
              />
              <Route
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <ModificaCapitolo />
                  </PrivateRoute>
                }
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
