// @ts-ignore
import express from "express";
import {getConnection} from "../src/backend/mysql";
import {join} from "node:path";

export const expressApp = express();

process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')

const fetchApis = () => {
    expressApp.get("/api/customers", (req, res) => {
        const query = "SELECT * FROM customers";
        const connection = getConnection()
        connection.query(query, (err, results) => {
            if (err) {
                console.error("Ocorreu um erro ao buscar os clientes:", err);
                res.status(500).json({ error: "Erro ao buscar clientes" });
            } else {
                res.json(results);
            }
        });
    });

    expressApp.get("/api/schedules", (req, res) => {
        const query = "SELECT * FROM schedules";
        const connection = getConnection()
        connection.query(query, (err, results) => {
            if (err) {
                console.error("Ocorreu um erro ao buscar os agendamentos:", err);
                res.status(500).json({ error: "Erro ao buscar agendamentos" });
            } else {
                res.json(results);
            }
        });
    });
}

fetchApis();
expressApp.use(express.static(process.env.DIST));