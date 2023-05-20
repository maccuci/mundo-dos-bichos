import React, {useState} from "react";
import {Link} from "react-router-dom";
import ClientItem from "@/components/client-item";
import {clients} from "@/backend/customer/list-clients";

const Clients = () => {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentClients = clients.slice(firstIndex, lastIndex);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="bg-gray-200 p-4 min-h-screen flex flex-col">
                <div className="flex justify-between">
                    <h1 className="text-2xl">Lista de Clientes</h1>
                    <Link
                        to={"/"}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Voltar
                    </Link>
                </div>

                <ul className="grid grid-cols-2 gap-4 flex-grow">
                    {currentClients.map((client) => (
                        <ClientItem
                            key={client.id}
                            className="text-lg py-2"
                            id={client.id}
                            name={client.name}
                            description={client.description}
                        />
                    ))}
                </ul>

                <div className="flex justify-center mt-24">
                    {Array.from(
                        {length: Math.ceil(clients.length / itemsPerPage)},
                        (_, index) => index + 1
                    ).map((page) => (
                        <button
                            key={page}
                            onClick={() => changePage(page)}
                            className={`px-4 py-2 mx-1 rounded ${currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-800"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
            );
        </div>
    )
}

export default Clients;
