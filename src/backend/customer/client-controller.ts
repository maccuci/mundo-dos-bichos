import {getConnection} from "../mysql";
import {Connection, RowDataPacket, QueryError} from "mysql2";
import {OkPacket, Query} from "mysql2/promise";

export type Customer = {
    id: number;
    name: string;
    petName: string;
    petService: string;
    email: string;
    phone: string;
};

export function createCustomer(name: string, email: string, phone: string, petName: string, petService: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const connection = getConnection();

        const query: string = `INSERT INTO customers (name, email, phone, petName, petService) VALUES (?, ?, ?, ?, ?)`;
        const values: any[] = [name, email, phone, petName, petService];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Ocorreu um erro ao criar o cliente:', err);
                reject(err);
                return;
            }
            resolve();
        });
    });
}

export function customers(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
        const connection = getConnection();
        const query: string = `SELECT * FROM customers ORDER BY id`;

        connection.query(query, (err, rows: RowDataPacket[]) => {
            if (err) {
                console.error('Ocorreu um erro ao listar os clientes:', err);
                reject(err);
            } else {
                const acc = rows.map(row => ({
                    id: row.id,
                    name: row.name,
                    petName: row.petName,
                    petService: row.petService,
                    email: row.email,
                    phone: row.phone
                }));
                resolve(acc);
            }
        });
    });
}

export function listCustomers(page: number, perPage: number): Promise<Customer[]> {
    return new Promise<Customer[]>((resolve, reject) => {
        const connection: Connection = getConnection();
        const offset = (page - 1) * perPage;
        const query: string = `SELECT * FROM customers ORDER BY id LIMIT ${perPage} OFFSET ${offset}`;

        const queryPromise: Promise<[RowDataPacket[]]> = new Promise<[RowDataPacket[]]>((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    console.error("Ocorreu um erro ao executar a consulta:", err);
                    reject(err);
                } else {
                    resolve([rows as RowDataPacket[]]);
                }
            });
        });

        queryPromise.then(([rows]: [RowDataPacket[]]) => {
            const acc: Customer[] = rows.map((row) => ({
                id: row.id,
                name: row.name,
                petName: row.petName,
                petService: row.petService,
                email: row.email,
                phone: row.phone,
            }));
            resolve(acc);
        }).catch((err: QueryError | Error) => {
            console.error("Ocorreu um erro ao listar os clientes:", err);
            reject(err);
        });
    });
}

export async function _listCustomers() {
    const accounts = []
    try {
        const acc = await customers();
        accounts.push(...acc)
        console.log(acc);
    } catch (error) {
        console.error('Ocorreu um erro ao listar os clientes:', error);
    }
    return accounts;
}

export function getCustomer(customerId: number): Promise<RowDataPacket | null> {
    return new Promise<RowDataPacket | null>((resolve, reject) => {
        const connection: Connection = getConnection();

        const query: string = `SELECT * FROM customers WHERE id = ?`;
        const values: any[] = [customerId];

        connection.query(query, values, (err, rows: RowDataPacket[]) => {
            if (err) {
                console.error('Ocorreu um erro ao obter o cliente:', err);
                reject(err);
                return;
            }
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        });
    });
}


export function updateCustomer(id: number, name: string, email: string, phone: string, petName: string, petService: any) {
    const connection: Connection = getConnection();

    const query: string = `UPDATE customers SET name = ?, email = ?, phone = ?, petName = ?, petService = ? WHERE id = ?`;

    connection.query(query, [name, email, phone, petName, petService, id], (err, result) => {
        if (err) {
            console.error('Ocorreu um erro ao atualizar o cliente:', err);
            return;
        }
        console.log('Cliente atualizado com sucesso!');
    });
}


