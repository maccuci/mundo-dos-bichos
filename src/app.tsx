import Masthead from "./components/masthead";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clients from "./pages/clients";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Masthead />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </Router>
  )
}

export default App;
