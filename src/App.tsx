import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProvaFetch from "./components/ProvaFetch";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/Home";
import MyFooter from "./components/MyFooter";
import ProfileDetails from "./components/ProfileDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <ProvaFetch />
          <MyNavbar />
          <main className="flex-grow-1 ">
            <Routes>
              <Route element={<Home />} path="/" />
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
