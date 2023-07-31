import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ipcRenderer } from "electron";
import ClientItem from "@/components/client-item";

interface Client {
  id: number;
  name: string;
  petName: string;
  petService: string;
  email: string;
  phone: string;
}

const Clients = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [clientAccounts, setClientAccounts] = useState<Client[]>([]);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentClients = clientAccounts.slice(firstIndex, lastIndex);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        ipcRenderer.send("fetch-clients-test");
      } catch (error) {
        console.error("Ocorreu um erro ao buscar os clientes:", error);
      }
    };

    fetchClients();

    const fetchClientsResponseHandler = (event: any, data: Client[]) => {
      setClientAccounts(data);
      console.log(data);
    };

    ipcRenderer.on("fetchClientsResponse-test", fetchClientsResponseHandler);

    return () => {
      ipcRenderer.removeListener(
        "fetchClientsResponse-test",
        fetchClientsResponseHandler
      );
    };
  }, []);

  return (
    <div>
      <div className="bg-gray-200 p-4 min-h-screen flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl">Lista de Clientes</h1>
          <Link
            to={"/home"}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Voltar
          </Link>
        </div>

        {clientAccounts.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 flex-grow">
            {currentClients.map((client: Client) => (
              <ClientItem
                key={client.id}
                id={client.id}
                name={client.name}
                petName={client.petName}
                petService={client.petService}
                email={client.email}
                phone={client.phone}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-xl mt-10">
            Nenhum cliente encontrado.
          </p>
        )}

        <div className="flex justify-center mt-24">
          {Array.from(
            { length: Math.ceil(clientAccounts.length / itemsPerPage) },
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
};

export default Clients;
