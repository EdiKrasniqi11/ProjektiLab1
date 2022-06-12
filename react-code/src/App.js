import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Shtetet from "../src/Shtetet/Shtetet";
import Qytetet from "../src/Qytetet/Qytetet";
import Lajmet from "../src/Lajmet/Lajmet";
import Njoftimet from "./Njoftimet/Njoftimet";
import Fakulteti from "./Fakulteti/Fakulteti";
import Dega from "./Dega/Dega";
import Drejtimi from "./Drejtimi/Drejtimi";
import Vendbanimi from "./Vendbanimi/Vendbanimi";
import Specializimi from "./Specializimi/Specializimi";
import Studenti from "./Studenti/Studenti";
import Galeria from "./Galeria/Galeria";
import Profesori from "./Profesori/Profesori";

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
          <Route path="/fakultetet" element={<Fakulteti />} />
          <Route path="/deget" element={<Dega />} />
          <Route path="/drejtimet" element={<Drejtimi />} />
          <Route path="/vendbanimet" element={<Vendbanimi />} />
          <Route path="/specializimet" element={<Specializimi />} />
          <Route path="/studentet" element={<Studenti />} />
          <Route path="/galerite" element={<Galeria />} />
          <Route path="/profesoret" element={<Profesori />} />

        </Routes>
      </div>
    </Router>
    <Footer />
    </div>
  );
}
export default App;
