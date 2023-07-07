import Navbar from "./navbar";

const Masthead = () => {
  return (
    <div>
      <div className="p-12 font-bold z-10 text-blue-600 text-center flex-1 flex items-center justify-center flex-col">
        <h1 className="text-4xl mb-2 xl:text-5xl">Mundo dos Bichos</h1>
        <h2 className="text-2xl text-blue-500 mb-2 xl:text-3xl tracking-tight">
          <span>
            Bem-vindo ao{" "}
            <span className="text-blue-600">Painel de Controle</span>
          </span>
        </h2>
        <Navbar />
      </div>
    </div>
  );
};

export default Masthead;
