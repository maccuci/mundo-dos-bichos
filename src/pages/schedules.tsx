import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ipcRenderer} from "electron";

const Schedules = () => {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [schedules, setSchedules] = useState<any>([]);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentSchedules = schedules.slice(firstIndex, lastIndex);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                ipcRenderer.send('fetch-schedules');
            } catch (error) {
                console.error('Ocorreu um erro ao buscar os agendamentos:', error);
            }
        };

        fetchSchedules();

        ipcRenderer.on('fetchSchedulesResponse', (event, data) => {
            setSchedules(data)
            console.log(data);
        });

        return () => {
            ipcRenderer.removeAllListeners('fetchSchedulesResponse');
        };
    }, []);

    // @ts-ignore
    return (
        <div>
            <div className="bg-gray-200 p-4 min-h-screen flex flex-col">
                <div className="flex justify-between">
                    <h1 className="text-2xl">Lista de Agendamentos</h1>
                    <Link
                        to={"/home"}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Voltar
                    </Link>
                </div>

                {schedules.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-4 flex-grow">
                        {currentSchedules.map((schedule: any) => (
                            <li key={schedule.id} className="bg-white shadow-md p-4 mt-10 rounded">
                                <p className="text-center font-bold">Informações de {schedule.petName} ({schedule.id})</p>
                                {/*<p className="text-center">Nome do Animal: {schedule.petName}</p>*/}
                                <p className="text-center">Serviço: {schedule.service}</p>
                                <p className="text-center">Preço: {schedule.price}</p>
                                <p className="text-center">Data: {new Date(Date.parse(schedule.date)).toLocaleString()}</p>

                                <p className="text-center mt-8">Contatos</p>
                                <li className="">
                                    <p className="text-center">Email: {schedule.emailOwner}</p>
                                </li>
                            </li>
                        ))}
                    </ul>

                ) : (
                    <p className="text-center text-xl mt-10">Nenhum agendamento encontrado.</p>
                )}

                <div className="flex justify-center mt-24">
                    {Array.from(
                        { length: Math.ceil(schedules.length / itemsPerPage) },
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
}

export default Schedules;