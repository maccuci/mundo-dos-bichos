import {getConnection} from "@/backend/mysql";
import {Connection} from "mysql2";

interface QueryResult extends Array<any> {
    affectedRows?: number;
}

export function createSchedule(petName: string, emailOwner: string, service: string, date: string, price: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const connection = getConnection()

        const query: string = `INSERT INTO schedules (emailOwner, petName, service, date, price) VALUES (?, ?, ?, ?, ?)`;
        const values: any[] = [emailOwner, petName, service, date, price];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Ocorreu um erro ao criar o agendamento:', err);
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}

export function updateSchedule(id: number, email: string, petName: string, service: string, date: string, price: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const connection: Connection = getConnection();
        const query: string = `UPDATE schedules SET petName = ?, service = ?, emailOwner = ?, date = ?, price = ? WHERE id = ?`;

        connection.query(query, [petName, service, email, date, price, id], (err, result) => {
            if (err) {
                console.error('Ocorreu um erro ao atualizar o agendamento:', err);
                reject(err);
            } else {
                console.log('Agendamento atualizado com sucesso!');
                resolve(true);
            }
        });
    });
}
export function deleteSchedule(scheduleId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const connection = getConnection();
        const query = 'DELETE FROM schedules WHERE id = ?';
        const values = [scheduleId];

        connection.query(query, values, (err, result: QueryResult) => {
            if (err) {
                console.error('Ocorreu um erro ao excluir o agendamento:', err);
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
