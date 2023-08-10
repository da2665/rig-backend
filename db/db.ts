import mysql from "mysql2";
import dbConfig from "./db.config";

export default mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})