import { getConnection } from "@/backend/mysql";
import { Connection } from "mysql2";

interface QueryResult extends Array<any> {
  affectedRows?: number;
}

export function createSchedule(
  petName: string,
  email_owner: string,
  service: string,
  date: string,
  price: number,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const connection = getConnection();

    const query: string =
      `INSERT INTO schedules (email_owner, pet_name, service, date, price) VALUES (?, ?, ?, ?, ?)`;
    const values: any[] = [email_owner, petName, service, date, price];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Ocorreu um erro ao criar o agendamento:", err);
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}

export function updateSchedule(
  id: number,
  email: string,
  pet_name: string,
  service: string,
  date: string,
  price: number,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const connection: Connection = getConnection();
    const query: string =
      `UPDATE schedules SET pet_name = ?, service = ?, email_owner = ?, date = ?, price = ? WHERE id = ?`;

    connection.query(
      query,
      [pet_name, service, email, date, price, id],
      (err, result) => {
        if (err) {
          console.error("Ocorreu um erro ao atualizar o agendamento:", err);
          reject(err);
        } else {
          console.log("Agendamento atualizado com sucesso!");
          resolve(true);
        }
      },
    );
  });
}
export function deleteSchedule(scheduleId: number): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const connection = getConnection();
    const query = "DELETE FROM schedules WHERE id = ?";
    const values = [scheduleId];

    connection.query(query, values, (err, result: QueryResult) => {
      if (err) {
        console.error("Ocorreu um erro ao excluir o agendamento:", err);
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
