import mysql from 'mysql2';

export default async function connMariaDB(){
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });

        // console.log("db연결")
        return connection;

    } catch (error) {
        // console.error('Error connecting to MariaDB:', error);
        throw error;
    }
}