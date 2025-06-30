import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProvaFetch from "./components/ProvaFetch";
import MyNavbar from "./components/MyNavbar";
import sfondImg from "../../src/assets/sfondocapstone.jpg";

function App() {
  return (
    <>
      <BrowserRouter>
        <ProvaFetch />
        <MyNavbar />
      </BrowserRouter>
    </>
  );
}

export default App;
