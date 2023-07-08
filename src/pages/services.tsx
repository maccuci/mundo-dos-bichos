import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateService from "@/components/services/create-service";
import EditService from "@/components/services/edit-service";
import { isConnected } from "@/backend/mysql";

const Services = () => {
  const [selectedService, setSelectedService] = useState("");

  const renderServiceForm = (serviceType: string) => {
    if (serviceType === "create") {
      return <CreateService />;
    } else if (serviceType === "edit") {
      return <EditService />;
    }
    return null;
  };

  const handleServiceSelection = (serviceType: string) => {
    setSelectedService(serviceType);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Serviços
      </h1>
      <nav className="flex justify-center gap-4">
        <button
          onClick={() => handleServiceSelection("create")}
          className={`py-3 px-6 rounded-lg transition-colors text-white font-semibold border border-blue-700 ${
            selectedService === "create"
              ? "bg-blue-600 text-white underline underline-offset-8"
              : "bg-blue-700 text-white hover:bg-white hover:text-blue-700"
          }`}
        >
          Agendar
        </button>

        <button
          onClick={() => handleServiceSelection("edit")}
          className={`py-3 px-6 rounded-lg transition-colors text-white font-semibold border border-blue-700 ${
            selectedService === "edit"
              ? "bg-blue-600 text-white underline underline-offset-8"
              : "bg-blue-700 text-white hover:bg-white hover:text-blue-700"
          }`}
        >
          Editar
        </button>
        <Link
          to="/home"
          className="py-3 px-6 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
        >
          Voltar
        </Link>
      </nav>
      <div className="mt-12">{renderServiceForm(selectedService)}</div>
    </div>
  );
};

export default Services;
