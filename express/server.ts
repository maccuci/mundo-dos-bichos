//@ts-ignore
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { getConnection } from "../src/backend/mysql";

export const expressApp = express();

process.env.DIST_ELECTRON = path.join(__dirname, "../");
process.env.DIST = path.join(process.env.DIST_ELECTRON, "../dist");

expressApp.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

expressApp.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
});

const fetchFromTable = (tableName: string, res: Response) => {
    const query = `SELECT * FROM ${tableName}`;
    const connection = getConnection();
    connection.query(query, (err, results) => {
        if (err) {
            console.error(`Ocorreu um erro ao buscar os ${tableName}:`, err);
            res.status(500).json({ error: `Erro ao buscar ${tableName}` });
        } else {
            res.json(results);
        }
    });
};

expressApp.get("/api/customers", (req: Request, res: Response) => {
    fetchFromTable("customers", res);
});

expressApp.get("/api/schedules", (req: Request, res: Response) => {
    fetchFromTable("schedules", res);
});

expressApp.use(express.static(process.env.DIST));
