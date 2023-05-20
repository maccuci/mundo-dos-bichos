import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Masthead from "./components/masthead";
import Clients from "./pages/clients";
import Schedules from "@/pages/schedules";
import Services from "@/pages/services";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Masthead />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
};

export default App;
