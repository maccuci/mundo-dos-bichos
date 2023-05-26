import {HashRouter as Router, Route, Routes} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Masthead from "@/components/masthead";
import Clients from "@/pages/clients";
import Schedules from "@/pages/schedules";
import Services from "@/pages/services";
import {AuthProvider} from "@/components/auth-context";
import Auth from "@/pages/auth";
import CustomerList from "@/pages/a";

const App = () => {
    return (
        <AuthProvider>
        <ToastContainer />
            <Router>
                <Routes>
                    <Route path="/" element={<Auth/>}/>
                    <Route path="/home" element={<Masthead/>}/>
                    {/*<Route path="/clients" element={<Clients/>}/>*/}
                    <Route path="/clients" element={<CustomerList/>}/>
                    <Route path="/schedules" element={<Schedules/>}/>
                    <Route path="/services" element={<Services/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
