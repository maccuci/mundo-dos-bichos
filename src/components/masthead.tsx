const Masthead = () => {
    return (
        <div>
            <div className="p-12 font-bold z-10 text-blue-500 text-center flex-1 flex items-center justify-center flex-col">
                <h1
                    className="text-4xl mb-2 xl:text-5xl"
                >
                    Mundo dos Bichos{' '}
                </h1>
                <h2 className="text-2xl text-blue-500 mb-2 xl:text-3xl tracking-tight">
                    <span>Bem-vindo ao Painel de Controle</span>
                </h2>
                <nav className="flex gap-2 mt-20">
                    <a href="/clients" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Clientes</a>
                    <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Agendamentos</a>
                    <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Serviços</a>
                </nav>
            </div>
        </div>
    )
}

export default Masthead;