import React, {useState} from "react";
import {deleteCustomer} from "@/backend/client/client-controller";
import Clients from "@/pages/clients";

type Props = {
    id: number;
    name: string;
    petName: string;
    petService: string;
    email: string;
    phone: string;
}

const ClientItem = ({ id, name, petName, petService, email, phone }: Props) => {
    const [message, setMessage] = useState(false);

    const handleDelete = () => {
        deleteCustomer(id).then(() => {
            setMessage(true);
            setTimeout(() => window.location.reload(), 1000);
        })
    }

    return (
        <div
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mt-2 mb-3 rounded-full shadow-lg" src="/icon.ico"
                     alt="Bonnie image"/>
                <h5 className="mb-1 text-xl font-medium text-black">{name}</h5>
                <span className="text-sm text-gray-500">Animal: {petName}</span>
                <span className="text-sm text-gray-500">Serviço: {petService}</span>
                <span className="text-sm text-gray-500">Contatos</span>
                <div className="flex flex-col items-center">
                    <span className="text-center text-gray-500">Email: {email}</span>
                    <span className="text-sm text-center text-gray-500">Telefone: {phone}</span>
                </div>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <button onClick={handleDelete} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors">
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ClientItem;