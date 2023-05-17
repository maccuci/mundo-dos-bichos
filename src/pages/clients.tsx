import { Link } from 'react-router-dom'
 
const Clients = () => {
    return (
        <div className="flex">
            <Link to={"/"} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 transition-colors rounded mt-2 ml-2">Voltar</Link>
        </div>
    )
}

export default Clients;
