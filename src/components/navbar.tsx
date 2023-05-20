import { Link } from 'react-router-dom';
import { createCustomer } from "../backend/client-controller";

const Navbar = () => {
    const handle = () => {
        createCustomer("Roberto", "roberto@gmail.com", "32954328703", "Flubas", "Tosa")
        console.log('executado! create')
    }

    return (
        <div className="flex">
            <nav className="flex gap-2 mt-20">
                <Link to={"/clients"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors'>Clientes</Link>
                <Link to={"/schedules"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Agendamentos</Link>
                <Link to={"/services"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Serviços</Link>
                <button onClick={handle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Teste</button>
            </nav>
        </div>
    )
}

export default Navbar;
