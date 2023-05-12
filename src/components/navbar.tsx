const Navbar = () => {
    return (
        <div className="flex">
            <nav className="flex gap-2 mt-20">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Clientes</button>
                <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Agendamentos</a>
                <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Serviços</a>
            </nav>
        </div>
    )
}

export default Navbar;