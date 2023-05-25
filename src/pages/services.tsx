import {Link} from "react-router-dom";
import React, {useState} from "react";
import {createCustomer, updateCustomer, getCustomerByName} from "../backend/customer/client-controller"
import {display} from "@/utils/notification";

const Services = () => {
    const [selectedService, setSelectedService] = useState("");

    const render = (s: string) => {
        switch (s) {
            case "create":
                return <CreateService/>;
            case "edit":
                return <EditService />
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
                        Criar
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
    name: string;
    email: string;
    phone: string;
    petName: string;
    petService: string;
}

const CreateService = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        petName: "",
        petService: "",
    });
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const success = await createCustomer(
            formData.name,
            formData.email,
            formData.phone,
            formData.petName,
            formData.petService
        );

        if(success) {
            setSuccessMessage(true);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                    <label htmlFor="petName" className="block text-sm font-medium text-gray-700">
                        Nome do Pet
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
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700">
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
                    <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                        Valor
                    </label>
                    <input
                        type="number"
                        id="value"
                        name="value"
                        min={1}
                        onChange={handleInput}
                        className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-block px-4 py-2 text-white font-medium bg-blue-500 hover:bg-blue-700 rounded-md"
                    >
                        Enviar
                    </button>
                </div>
            </form>
            {successMessage && <p className={"font-bold text-green-600 text-center mt-2"}>Serviço criado com sucesso!</p>}
        </div>
    );
};

const EditService = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        petName: "",
        petService: "",
    });
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const customer = getCustomerByName(formData.name)

        if(customer !== null) {
            updateCustomer(1, formData.name, formData.email, formData.phone, formData.petName, formData.petService)
        } else {
            setSuccessMessage(false)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                    <label htmlFor="petName" className="block text-sm font-medium text-gray-700">
                        Nome do Pet
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
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700">
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
                    <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                        Valor
                    </label>
                    <input
                        type="number"
                        id="value"
                        name="value"
                        min={1}
                        onChange={handleInput}
                        className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-block px-4 py-2 text-white font-medium bg-blue-500 hover:bg-blue-700 rounded-md"
                    >
                        Enviar
                    </button>
                </div>
            </form>
            {successMessage && display({ message: "Serviço editado com sucesso!", type: 1 })}
            {/*{!successMessage && display({ message: "Serviço não pode ser editado!", type: 3 })}*/}
        </div>
    );
}


export default Services;