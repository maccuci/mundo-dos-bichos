import {Link} from "react-router-dom";
import React from "react";

const Schedules = () => {
    return (
        <div>
            <h1>Agendamentos</h1>
            <Link
                to={"/home"}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Voltar
            </Link>
        </div>
    )
}

export default Schedules;