import {getConnection} from "@/backend/mysql";

type Schedule = {
    id?: number;
    petName: string;
    emailOwner: string;
    service: string;
    date: Date;
    price: number;
}

export function createSchedule({ petName, emailOwner, service, date, price }: Schedule): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const connection = getConnection()

        const query: string = `INSERT INTO schedules (emailOwner, petName, service, date, price) VALUES (?, ?, ?, ?, ?)`;
        const values: any[] = [emailOwner, petName, service, date, price];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Ocorreu um erro ao criar o agendamento:', err);
                reject(err);
                return false;
            }
            resolve(true);
        });
    });
}