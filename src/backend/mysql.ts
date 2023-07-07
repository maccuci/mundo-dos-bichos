import mysql, { Connection } from "mysql2";
import Query from "mysql2/typings/mysql/lib/protocol/sequences/Query";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mundo-dos-bichos",
});

export function createConnection() {
  connection.connect((err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return;
    }
    console.log("Conexão bem-sucedida ao banco de dados MySQL!");
    executeQuery(
      "CREATE TABLE IF NOT EXISTS `customers` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(64) NOT NULL, `petName` VARCHAR(64) NOT NULL, `petService` VARCHAR(64) NOT NULL, `email` VARCHAR(64) NOT NULL, `phone` VARCHAR(64) NOT NULL, PRIMARY KEY(`id`)) ENGINE = InnoDB DEFAULT CHARSET = UTF8;",
    );
    executeQuery(
      "CREATE TABLE IF NOT EXISTS `schedules` (`id` INT NOT NULL AUTO_INCREMENT, `petName` VARCHAR(64) NOT NULL, `service` VARCHAR(64) NOT NULL, `emailOwner` VARCHAR(64) NOT NULL, `date` DATETIME NOT NULL, `price` DOUBLE NOT NULL, PRIMARY KEY(`id`)) ENGINE = InnoDB DEFAULT CHARSET = UTF8;",
    );
  });
}

export function executeQuery(query: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const connection: Connection = getConnection();

    connection.query(query, (err: Query.QueryError) => {
      if (err) {
        console.error("Ocorreu um erro ao executar a consulta:", err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export function closeConnection() {
  if (connection == null) return;

  connection.end((err) => {
    if (err) {
      console.error("Erro ao fechar a conexão:", err);
      return;
    }
    console.log("Conexão fechada com o banco de dados.");
  });
}

export function getConnection() {
  return connection;
}
