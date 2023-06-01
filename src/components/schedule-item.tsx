import React from "react";
import {deleteSchedule} from "@/backend/schedule/schedule-controller";

type Props = {
    id: number;
    petName: string;
    service: string;
    price: number;
    date: string;
    emailOwner: string;
}

const ScheduleItem = ({ id, petName, service, price, date, emailOwner }: Props) => {
    const handleDelete = () => {
        deleteSchedule(id).then(() => {
            window.location.reload();
        })
    }

    return (
        <li key={id} className="bg-white shadow-md p-4 mt-10 rounded">
            <p className="text-center font-bold">Informações de {petName} ({id})</p>
            {/*<p className="text-center">Nome do Animal: {schedule.petName}</p>*/}
            <p className="text-center">Serviço: {service}</p>
            <p className="text-center">Preço: {price}</p>
            <p className="text-center">Data: {new Date(Date.parse(date)).toLocaleString()}</p>

            <p className="text-center mt-8">Contatos</p>
            <li className="">
                <p className="text-center">Email: {emailOwner}</p>
            </li>
            <div className="items-center flex justify-center">
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Excluir</button>
            </div>
        </li>
    )
}

export default ScheduleItem;