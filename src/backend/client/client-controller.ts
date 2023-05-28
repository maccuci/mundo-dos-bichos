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

interface QueryResult extends Array<any> {
    affectedRows?: number;
}


export function createCustomer(name: string, email: string, phone: string, petName: string, petService: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const connection = getConnection();

        const query: string = `INSERT INTO customers (name, email, phone, petName, petService) VALUES (?, ?, ?, ?, ?)`;
        const values: any[] = [name, email, phone, petName, petService];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Ocorreu um erro ao criar o cliente:', err);
                reject(err);
                return false;
            }
            resolve(true);
        });
    });
}

export function getCustomerById(customerId: number): Promise<any | null> {
    return new Promise<any | null>((resolve, reject) => {
        const connection: Connection = getConnection();

        const query: string = `SELECT * FROM customers WHERE id = ?`;
        const values: any[] = [customerId];

        connection.query(query, values, (err, rows: RowDataPacket[]) => {
            if (err) {
                console.error('Ocorreu um erro ao obter o cliente:', err);
                reject(err);
            } else if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        });
    });
}

export function getCustomerByName(customerName: string): Promise<RowDataPacket | null> {
    return new Promise<RowDataPacket | null>((resolve, reject) => {
        const connection: Connection = getConnection();

        const query: string = `SELECT * FROM customers WHERE name = ?`;
        const values: any[] = [customerName];

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

export function updateCustomer(id: number, name: string, email: string, phone: string, petName: string, petService: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const connection: Connection = getConnection();
        const query: string = `UPDATE customers SET name = ?, email = ?, phone = ?, petName = ?, petService = ? WHERE id = ?`;

        connection.query(query, [name, email, phone, petName, petService, id], (err, result) => {
            if (err) {
                console.error('Ocorreu um erro ao atualizar o cliente:', err);
                reject(err);
            } else {
                console.log('Cliente atualizado com sucesso!');
                resolve(true);
            }
        });
    });
}

export function deleteCustomer(customerId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const connection = getConnection();
        const query = 'DELETE FROM customers WHERE id = ?';
        const values = [customerId];

        connection.query(query, values, (err, result: QueryResult) => {
            if (err) {
                console.error('Ocorreu um erro ao excluir o cliente:', err);
                reject(err);
                return;
            }

            if (result.affectedRows && result.affectedRows > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}


