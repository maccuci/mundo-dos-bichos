import React, { useState } from "react";
import { Link } from "react-router-dom";
import ClientItem from "./client-item";

const ClientList = () => {
    const clients = [
        { id: 1, name: "Cliente 1", description: "Tosa - Animal Grande" },
        { id: 2, name: "Cliente 2", description: "Tosa - Animal Pequeno" },
        { id: 3, name: "Cliente 3", description: "Tosa - Animal Médio" },
        { id: 4, name: "Cliente 4", description: "Tosa - Animal Grande" },
        { id: 5, name: "Cliente 5", description: "Tosa - Animal Grande" },
        { id: 6, name: "Cliente 6", description: "Tosa - Animal Médio" },
        { id: 7, name: "Cliente 7", description: "Tosa - Animal Pequeno" },
        { id: 8, name: "Cliente 8", description: "Tosa - Animal Grande" },
        { id: 9, name: "Cliente 9", description: "Tosa - Animal Médio" },
        { id: 10, name: "Cliente 10", description: "Tosa - Animal Pequeno" },
    ];

    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentClients = clients.slice(firstIndex, lastIndex);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    return (
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
                    { length: Math.ceil(clients.length / itemsPerPage) },
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
};

export default ClientList;
