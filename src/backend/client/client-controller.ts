import {getConnection} from "../mysql";
import {Connection} from "mysql2";

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


