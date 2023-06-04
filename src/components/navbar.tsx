import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../components/auth-context';

const Navbar = () => {
    const {handleLogout} = useContext(AuthContext);

    return (
        <nav className="bg-blue-700 py-4 mt-10 rounded-lg">
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="hidden md:block">
                    <ul className="ml-4 flex items-center space-x-4">
                        <li>
                            <Link
                                to="/services"
                                className="text-white hover:text-gray-300 transition-colors"
                            >
                                Serviços
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/clients"
                                className="text-white hover:text-gray-300 transition-colors"
                            >
                                Clientes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/schedules"
                                className="text-white hover:text-gray-300 transition-colors"
                            >
                                Agendamentos
                            </Link>
                        </li>
                        <li>
                            <button
                                className="bg-indigo-700 hover:bg-indigo-800 transition-colors text-white font-bold py-2 px-4 rounded-lg shadow"
                                onClick={handleLogout}>
                                <div className="flex items-center">
                                    <svg
                                        className="h-4 w-4 mr-2 fill-current text-white"
                                        viewBox="0 0 2835 2835"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="#fff"
                                            d="M1417 0l1416 1417-1416 1418-1417-1418L1417 0zm0 1134L284 1563l1133 429 1134-429-1134-429z"
                                        />
                                    </svg>
                                    <Link to={"/"}
                                          onClick={handleLogout}
                                    >
                                        Sair
                                    </Link>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
