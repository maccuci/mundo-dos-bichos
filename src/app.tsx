import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Masthead from "./components/masthead";
import Clients from "./pages/clients";

const App = () => {
  return (
    // <div>
    //   <Masthead />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Masthead />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </Router>
  );
};

export default App;
