import React, { useState } from "react";
import { deleteSchedule } from "@/backend/schedule/schedule-controller";

type Props = {
  id: number;
  petName: string;
  service: string;
  price: number;
  date: string;
  emailOwner: string;
};

const ScheduleItem = ({
  id,
  petName,
  service,
  price,
  date,
  emailOwner,
}: Props) => {
  const [message, setMessage] = useState(false);
  const handleDelete = () => {
    deleteSchedule(id).then(() => {
      setMessage(true);
      setTimeout(() => window.location.reload(), 1200);
    });
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <li key={id} className="flex flex-col items-center pb-10">
        <p className="mt-1 mb-1 text-xl font-medium text-black">
          Informações de {petName} ({id})
        </p>
        <p className="text-sm text-gray-500">Serviço: {service}</p>
        <p className="text-sm text-gray-500">Preço: R$ {price}</p>
        <p className="text-sm text-gray-500">
          Data: {new Date(Date.parse(date)).toLocaleString()}
        </p>
        <p className="text-center mt-5">Contatos</p>
        <li className="flex flex-col items-center">
          <p className="text-center text-gray-500">Email: {emailOwner}</p>
        </li>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors"
          >
            Excluir
          </button>
        </div>
      </li>
      {message && (
        <p className="text-red-600 text-center font-bold">
          Agendamento removido
        </p>
      )}
    </div>
  );
};

export default ScheduleItem;
