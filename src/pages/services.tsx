import {Link} from "react-router-dom";
import React, {useState} from "react";
import {createCustomer, updateCustomer, getCustomerById, deleteCustomer} from "@/backend/client/client-controller"
import {createSchedule, deleteSchedule, updateSchedule} from "../backend/schedule/schedule-controller"
import {display} from "@/utils/notification";
import {ipcRenderer} from "electron";

const Services = () => {
    const [selectedService, setSelectedService] = useState("");

    const render = (s: string) => {
        switch (s) {
            case "create":
                return <CreateService/>;
            case "edit":
                return <EditService/>
            case "delete":
                return <DeleteService/>
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl">Serviços</h1>
                <nav className="flex justify-center gap-2 mt-10">
                    <button
                        onClick={() => setSelectedService("create")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        Agendar
                    </button>
                    <button
                        onClick={() => setSelectedService("edit")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        Editar
                    </button>
                    <button
                        onClick={() => setSelectedService("delete")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        Excluir
                    </button>
                    <Link
                        to={"/home"}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Voltar
                    </Link>
                </nav>
            </div>
            {render(selectedService)}
        </div>
    );
};

type FormData = {
    customerId: number;
    serviceId: number;
    name: string;
    email: string;
    phone: string;
    petName: string;
    petService: string;
    date: string;
    price: number;
}

const CreateService = () => {
    const [formData, setFormData] = useState<FormData>({
        customerId: 0,
        serviceId: 0,
        name: "",
        email: "",
        phone: "",
        petName: "",
        petService: "",
        date: "",
        price: 0
    });
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const successCustomer = await createCustomer(
            formData.name,
            formData.email,
            formData.phone,
            formData.petName,
            formData.petService
        );

        const successSchedule = await createSchedule(
            formData.petName,
            formData.email,
            formData.petService,
            formData.date,
            formData.price
        )

        if (successCustomer && successSchedule) {
            setSuccessMessage(true);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <legend className="text-center font-extrabold text-xl mt-2">Agendar Serviço</legend>
                <div className="grid grid-cols-3 gap-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium text-gray-700">
                            Nome do Cliente
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-gray-700">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block font-medium text-gray-700">
                            Telefone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="petName" className="block font-medium text-gray-700">
                            Nome do Animal
                        </label>
                        <input
                            type="text"
                            id="petName"
                            name="petName"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="petService" className="block font-medium text-gray-700">
                            Serviço
                        </label>
                        <input
                            type="text"
                            id="petService"
                            name="petService"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block font-medium text-gray-700">
                            Data
                        </label>
                        <input
                            type="datetime-local"
                            id="date"
                            name="date"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block font-medium text-gray-700">
                            Valor
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-block px-4 py-2 mb-2 text-white font-medium bg-blue-500 hover:bg-blue-700 rounded-md"
                    >
                        Enviar
                    </button>
                </div>
            </form>
            {successMessage && <p className="text-green-600 text-center font-bold">Serviço agendado com sucesso!</p>}
        </div>
    );
};

const EditService = () => {
    const [formData, setFormData] = useState<FormData>({
        customerId: 0,
        serviceId: 0,
        name: "",
        email: "",
        phone: "",
        petName: "",
        petService: "",
        date: "",
        price: 0
    });
    const [successMessage, setSuccessMessage] = useState<boolean>();

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await new Promise((resolve) => {
                ipcRenderer.send('fetch-clients');
                ipcRenderer.once('fetchClientsResponse', (event, data) => {
                    resolve(data);
                });
            });

            await new Promise((resolve) => {
                ipcRenderer.send('fetch-schedules');
                ipcRenderer.once('fetchSchedulesResponse', (event, data) => {
                    resolve(data);
                });
            });
        } catch (error) {
            console.error('Ocorreu um erro ao buscar os clientes e agendamentos:', error);
            return;
        }

        const { customerId, serviceId } = formData;
        const clientData = await updateCustomer(
            customerId,
            formData.name,
            formData.email,
            formData.phone,
            formData.petName,
            formData.petService
        ).catch((error) => {
            console.error('Ocorreu um erro ao editar o cliente:', error);
            setSuccessMessage(false);
        });

        if (clientData) {
            console.log('Cliente editado com sucesso:', clientData);
            setSuccessMessage(true);
        }

        const scheduleData = await updateSchedule(
            serviceId,
            formData.email,
            formData.petName,
            formData.petService,
            formData.date,
            formData.price
        ).catch((error) => {
            console.error('Ocorreu um erro ao editar o agendamento:', error);
            setSuccessMessage(false);
        });

        if (scheduleData) {
            setSuccessMessage(true);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <legend className="text-center font-extrabold text-xl mt-2">Editar Serviço</legend>
                <div className="grid grid-cols-3 gap-4">
                    <div className="mb-4">
                        <label htmlFor="customerId" className="block font-medium text-gray-700">
                            ID do Cliente
                        </label>
                        <input
                            type="number"
                            id="customerId"
                            name="customerId"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="serviceId" className="block font-medium text-gray-700">
                            ID do Serviço
                        </label>
                        <input
                            type="number"
                            id="serviceId"
                            name="serviceId"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium text-gray-700">
                            Nome do Cliente
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-gray-700">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block font-medium text-gray-700">
                            Telefone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="petName" className="block font-medium text-gray-700">
                            Nome do Animal
                        </label>
                        <input
                            type="text"
                            id="petName"
                            name="petName"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="petService" className="block font-medium text-gray-700">
                            Serviço
                        </label>
                        <input
                            type="text"
                            id="petService"
                            name="petService"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block font-medium text-gray-700">
                            Data
                        </label>
                        <input
                            type="datetime-local"
                            id="date"
                            name="date"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block font-medium text-gray-700">
                            Valor
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={handleInput}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-block px-4 py-2 mb-2 text-white font-medium bg-blue-500 hover:bg-blue-700 rounded-md"
                    >
                        Enviar
                    </button>
                </div>
            </form>
            {successMessage && <p className="text-green-600 text-center font-bold">Serviço editado com sucesso!</p>}
        </div>
    );
}

const DeleteService = () => {
    const handleInput = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const customerInputElement = document.getElementById('customerId-delete') as HTMLInputElement;
        const serviceInputElement = document.getElementById('serviceId-delete') as HTMLInputElement;
        const customerId = parseInt(customerInputElement.value, 10);
        const serviceId = parseInt(serviceInputElement.value, 10);

        try {
            ipcRenderer.send('fetch-clients');
            ipcRenderer.send('fetch-schedules');
        } catch (error) {
            console.error('Ocorreu um erro ao buscar os clientes e agendamentos:', error);
            return;
        }

        ipcRenderer.once('fetchClientsResponse', (event, data) => {
            const customer = data.find((item: any) => item.id === customerId);
            if (customer) {
                deleteCustomer(customer.id)
                    .then((success) => {
                        console.log('Cliente deletado com sucesso:', success);
                    })
                    .catch((error) => {
                        console.error('Ocorreu um erro ao deletar o cliente:', error);
                    });
            } else {
                console.log('Cliente não encontrado.');
            }
        });

        ipcRenderer.once('fetchSchedulesResponse', (event, data) => {
            const schedule = data.find((item: any) => item.id === serviceId);
            if (schedule) {
                deleteSchedule(schedule.id)
                    .then((success) => {
                        console.log('Agendamento deletado com sucesso:', success);
                    })
                    .catch((error) => {
                        console.error('Ocorreu um erro ao deletar o agendamento:', error);
                    });
            } else {
                console.log('Agendamento não encontrado.');
            }
        });
    };

    return (
        <div>
            <form>
                <legend className="text-center font-extrabold text-xl mt-2">Deletar Serviço</legend>
                <div className="grid grid-cols-3 gap-4">
                    <div className="mb-4">
                        <label htmlFor="customerId-delete" className="block font-medium text-gray-700">
                            ID do Cliente
                        </label>
                        <input
                            type="number"
                            id="customerId-delete"
                            name="customerId-delete"
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="serviceId-delete" className="block font-medium text-gray-700">
                            ID do Serviço
                        </label>
                        <input
                            type="number"
                            id="serviceId-delete"
                            name="serviceId-delete"
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-block px-4 py-2 mb-2 text-white font-medium bg-blue-500 hover:bg-blue-700 rounded-md"
                        onClick={handleInput}
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Services;