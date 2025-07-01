import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProvaFetch from "./components/ProvaFetch";
import MyNavbar from "./components/MyNavbar";
import sfondImg from "../../src/assets/sfondocapstone.jpg";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <ProvaFetch />
        <MyNavbar />
        <Home />
      </BrowserRouter>
    </>
  );
}

export default App;
