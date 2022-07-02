import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Shtetet from "./CRUDs/Shtetet/Shtetet";
import Qytetet from "./CRUDs/Qytetet/Qytetet";
import Lajmet from "./CRUDs/Lajmet/Lajmet";
import Njoftimet from "./CRUDs/Njoftimet/Njoftimet";
import Fakulteti from "./CRUDs/Fakulteti/Fakulteti";
import Dega from "./CRUDs/Dega/Dega";
import Drejtimi from "./CRUDs/Drejtimi/Drejtimi";
import Vendbanimi from "./CRUDs/Vendbanimi/Vendbanimi";
import Specializimi from "./CRUDs/Specializimi/Specializimi";
import Studenti from "./CRUDs/Studenti/Studenti";
import Galeria from "./CRUDs/Galeria/Galeria";
import Profesori from "./CRUDs/Profesori/Profesori";
import Lenda from "./CRUDs/Lenda/Lenda";
import Provimi from "./CRUDs/Provimi/Provimi";
import Waitlist from "./CRUDs/Waitlist/Waitlist";
import Shkembimi from "./CRUDs/Shkembimi/Shkembimi";
import Vleresimi from "./CRUDs/Vleresimi/Vleresimi";
import Termini from "./CRUDs/Termini/Termini";
import Login from "./Login/Login";
import Home from './Home/Home'

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
          <Route path="/" element={<Home />} />
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
          <Route path="/lendet" element={<Lenda />} />
          <Route path="/provimet" element={<Provimi />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/shkembimet" element={<Shkembimi />} />
          <Route path="/vleresimet" element={<Vleresimi />} />
          <Route path="/terminet" element={<Termini />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
    <Footer />
    </div>
  );
}
export default App;
