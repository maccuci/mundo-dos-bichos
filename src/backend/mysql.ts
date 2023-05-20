import mysql from "mysql2"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mundo-dos-bichos'
});

export function createConnection() {
    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return;
        }
        console.log('Conexão bem-sucedida ao banco de dados MySQL!');
        executeQuery('CREATE TABLE IF NOT EXISTS `customers` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(64) NOT NULL, `petName` VARCHAR(64) NOT NULL, `petService` VARCHAR(64) NOT NULL, `email` VARCHAR(64) NOT NULL, `phone` VARCHAR(64) NOT NULL, PRIMARY KEY(`id`)) ENGINE = InnoDB DEFAULT CHARSET = UTF8;')
    })
}

export function executeQuery(query: string) {
    try {
        connection.query(query);
        console.log(`A query ${query} foi executada com sucesso!`)
    } catch (err) {
        console.log(`A query ${query} não pode ser executada.\nCausa: ${err}`)
    }
}

export function closeConnection() {
    if (connection == null) return;

    connection.end((err) => {
        if (err) {
            console.error('Erro ao fechar a conexão:', err);
            return;
        }
        console.log('Conexão fechada com o banco de dados.');
    })
}

export function getConnection() {
    return connection;
}