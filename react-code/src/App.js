import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Shtetet from "../src/Shtetet/Shtetet";
import Qytetet from "../src/Qytetet/Qytetet";
import Lajmet from "../src/Lajmet/Lajmet";
import Home from "../src/Home/Home";
import Njoftimet from "../src/Njoftimet/Njoftimet";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div>
    <Router>
      <div className="headerDiv">
        <Header />
        <Routes>
          <Route path="/lajmet" element={<Lajmet />} />
          <Route path="/njoftimet" element={<Njoftimet />} />
          <Route path="/shtetet" element={<Shtetet />} />
          <Route path="/qytetet" element={<Qytetet />} />
        </Routes>
      </div>
    </Router>
    <Footer />
    </div>
  );
}
export default App;
