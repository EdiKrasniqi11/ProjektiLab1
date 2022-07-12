import React from "react";
import Header from './Header-Footer/Header/Header';
import Footer from "./Header-Footer/Footer/Footer";
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
import Administrator from "./CRUDs/Administrator/Administrator"
import SMIS from './UserPages/StudentPages/SMIS/Smis'
import MyTranscript from "./UserPages/StudentPages/MyTranscript/MyTranscript";
import ParaqitProvimet from "./UserPages/StudentPages/ParaqitProvimet/ParaqitProvimet";
import MySchedule from "./UserPages/StudentPages/MySchedule/MySchedule";
import Staff from "./UserPages/AdminPages/Staff/Staff"
import University from "./UserPages/AdminPages/University/University"
import Login from "./MainPages/Login-Register/Login";
import Home from './MainPages/Home/Home';
import Register from "./MainPages/Login-Register/Register";



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
          <Route path="/deget" element={<Dega />} />
          <Route path="/drejtimet" element={<Drejtimi />} />
          <Route path="/specializimet" element={<Specializimi />} />
          <Route path="/studentet" element={<Studenti />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/lendet" element={<Lenda />} />
          <Route path="/provimet" element={<Provimi />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/shkembimet" element={<Shkembimi />} />
          <Route path="/vleresimet" element={<Vleresimi />} />
          <Route path="/terminet" element={<Termini />} />
          <Route path="/smis" element={<SMIS />}>
            <Route path="/smis/transkripta" element={<MyTranscript />} />
            <Route path="/smis/paraqit-provimet" element={<ParaqitProvimet />} />
            <Route path="/smis/my-schedule" element={<MySchedule />} />
          </Route>
          <Route path="/staff" element={<Staff />}>
            <Route path="/staff/studentet" element={<Studenti />} />
            <Route path="/staff/profesoret" element={<Profesori />} />
            <Route path="/staff/administratoret" element={<Administrator />} />
            <Route path="/staff/waitlist" element={<Waitlist />} />
          </Route>
          <Route path="/university" element={<University />}>
            <Route path="/university/shtetet" element={<Shtetet />} />
            <Route path="/university/qytetet/:id" element={<Qytetet />} />
            <Route path="/university/vendbanimet/:shteti/:qyteti" element={<Vendbanimi />} />
            <Route path="/university/fakultetet" element={<Fakulteti />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
    <Footer />
    </div>
  );
}
export default App;
