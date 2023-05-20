import {Link} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "@/components/auth-context";

const Navbar = () => {
    const {handleLogout} = useContext(AuthContext)

    return (
        <div className="flex">
            <nav className="flex gap-2 mt-20">
                <Link to={"/clients"}
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors'>Clientes</Link>
                <Link to={"/schedules"}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Agendamentos</Link>
                <Link to={"/services"}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Serviços</Link>
                <Link to={"/"} onClick={() => handleLogout()}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">Sair</Link>
            </nav>
        </div>
    )
}

export default Navbar;
