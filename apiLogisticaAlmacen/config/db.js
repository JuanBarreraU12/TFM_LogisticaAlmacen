const mysql = require('mysql2');

const pool = mysql.createPool({
    /*
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
*/
host: 'localhost',
user: 'root',
password: '', 
port: 3306,
database: 'gestion_almacen'

});

global.db = pool;