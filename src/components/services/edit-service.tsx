import React, { useState } from "react";
import { ipcRenderer } from "electron";
import { updateCustomer } from "@/backend/client/client-controller";
import { updateSchedule } from "@/backend/schedule/schedule-controller";

const EditService = () => {
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
  const [successMessage, setSuccessMessage] = useState<boolean>();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await new Promise((resolve) => {
        ipcRenderer.send("fetch-clients");
        ipcRenderer.once("fetchClientsResponse", (event, data) => {
          resolve(data);
        });
      });

      await new Promise((resolve) => {
        ipcRenderer.send("fetch-schedules");
        ipcRenderer.once("fetchSchedulesResponse", (event, data) => {
          resolve(data);
        });
      });
    } catch (error) {
      console.error(
        "Ocorreu um erro ao buscar os clientes e agendamentos:",
        error
      );
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
      console.error("Ocorreu um erro ao editar o cliente:", error);
      setSuccessMessage(false);
    });

    if (clientData) {
      console.log("Cliente editado com sucesso:", clientData);
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
      console.error("Ocorreu um erro ao editar o agendamento:", error);
      setSuccessMessage(false);
    });

    if (scheduleData) {
      setSuccessMessage(true);
    }
  };
  return (
    <div className="container mx-auto mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-xl"
      >
        <legend className="text-center font-extrabold text-xl mt-2">
          Editar Serviço
        </legend>
        <div className="grid grid-cols-3 gap-4">
          <div className="mb-4">
            <label
              htmlFor="customerId"
              className="block font-medium text-gray-700"
            >
              ID do Cliente
            </label>
            <input
              type="number"
              id="customerId"
              name="customerId"
              onChange={handleInput}
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="serviceId"
              className="block font-medium text-gray-700"
            >
              ID do Serviço
            </label>
            <input
              type="number"
              id="serviceId"
              name="serviceId"
              onChange={handleInput}
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
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
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
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
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
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
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            />
          </div>
          <div className="mb-4">
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
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            />
          </div>
          <div className="mb-4">
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
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
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
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
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
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
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
      {successMessage && (
        <p className="text-green-600 text-center font-bold">
          Serviço editado com sucesso!
        </p>
      )}
    </div>
  );
};

export default EditService;
