import React, { useState } from "react";
import { createCustomer } from "@/backend/client/client-controller";
import { createSchedule } from "@/backend/schedule/schedule-controller";

const CreateService = () => {
  const [formData, setFormData] = useState<ServiceFormData>({
    customerId: 0,
    serviceId: 0,
    name: "",
    email: "",
    phone: "",
    petName: "",
    petService: "",
    date: "",
    price: 0,
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
    );

    if (successCustomer && successSchedule) {
      setSuccessMessage(true);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Agendar Serviço
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Nome do Cliente
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInput}
              placeholder="Nome do Cliente"
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInput}
              placeholder="Email"
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={handleInput}
              placeholder="Telefone"
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label
              htmlFor="petName"
              className="block font-medium text-gray-700"
            >
              Nome do Animal
            </label>
            <input
              type="text"
              id="petName"
              name="petName"
              onChange={handleInput}
              placeholder="Nome do Animal"
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label
              htmlFor="petService"
              className="block font-medium text-gray-700"
            >
              Serviço
            </label>
            <input
              type="text"
              id="petService"
              name="petService"
              onChange={handleInput}
              placeholder="Serviço"
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label htmlFor="date" className="block font-medium text-gray-700">
              Data
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              onChange={handleInput}
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label htmlFor="price" className="block font-medium text-gray-700">
              Valor
            </label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleInput}
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            />
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-2 px-4 font-semibold bg-blue-500 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="text-green-600 text-center font-bold mt-4">
          Serviço agendado com sucesso!
        </p>
      )}
    </div>
  );
};

export default CreateService;
