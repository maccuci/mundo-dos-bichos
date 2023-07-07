import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Masthead from "@/components/masthead";
import Schedules from "@/pages/schedules";
import Services from "@/pages/services";
import { AuthProvider } from "@/components/auth-context";
import Clients from "@/pages/clients";
import Login from "@/pages/login";

//http://127.0.0.1:7777/
const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Masthead />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
