import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProvaFetch from "./components/ProvaFetch";
import MyNavbar from "./components/MyNavbar";
import sfondImg from "../../src/assets/sfondocapstone.jpg";
import Home from "./components/Home";
import MyFooter from "./components/MyFooter";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <ProvaFetch />
          <MyNavbar />
          <main className="flex-grow-1 ">
            <Routes></Routes>
            <Home />
          </main>
          <MyFooter />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
