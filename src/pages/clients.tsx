import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { _listCustomersPerArray } from "../backend/customer/client-controller"

const Clients = () => {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [clientAccounts, setClientAccounts] = useState<any[]>([]);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const acc: any = await _listCustomersPerArray();
                setClientAccounts(acc);
            } catch (error) {
                console.error('Ocorreu um erro ao obter os dados dos clientes:', error);
            }
        };

        fetchData();
    }, []);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentClients = clientAccounts.slice(firstIndex, lastIndex);


    return (
        <div>
            <div className="bg-gray-200 p-4 min-h-screen flex flex-col">
                <div className="flex justify-between">
                    <h1 className="text-2xl">Lista de Clientes</h1>
                    <Link
                        to={"/home"}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Voltar
                    </Link>
                </div>

                {clientAccounts.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-4 flex-grow">
                        {currentClients.map((client) => (
                            <li key={client.id}>
                                <p>{client.name}</p>
                                <p>{client.service}</p>
                                <p>{client.email}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-xl mt-10">Nenhum cliente encontrado.</p>
                )}

                <div className="flex justify-center mt-24">
                    {Array.from(
                        { length: Math.ceil(clientAccounts.length / itemsPerPage) },
                        (_, index) => index + 1
                    ).map((page) => (
                        <button
                            key={page}
                            onClick={() => changePage(page)}
                            className={`px-4 py-2 mx-1 rounded ${
                                currentPage === page
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-gray-800"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clients;