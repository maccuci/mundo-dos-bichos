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
        <div>
            <li key={id} className="bg-white shadow-md p-4 mt-10 rounded">
                <p className="text-center font-bold">Informações de {name} ({id})</p>
                <p className="text-center">Nome do Animal: {petName}</p>
                <p className="text-center">Serviço: {petService}</p>
                <p className="text-center mt-8">Contatos</p>
                <li className="">
                    <p className="text-center">Email: {email}</p>
                    <p className="text-center">Telefone: {phone}</p>
                </li>
                <div className="items-center flex justify-center">
                    <button onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Excluir
                    </button>
                </div>
            </li>
            {message && <p className="text-red-600 font-bold">Cliente removido</p>}
        </div>
    )
}

export default ClientItem;