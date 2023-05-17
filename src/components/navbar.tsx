import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="flex">
            <nav className="flex gap-2 mt-20">
                <Link to={"/clients"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors'>Clientes</Link>
                <Link to={"/schedules"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Agendamentos</Link>
                <Link to={"/services"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Serviços</Link>
            </nav>
        </div>
    )
}

export default Navbar;