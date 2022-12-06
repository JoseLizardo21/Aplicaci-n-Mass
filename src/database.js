const msyql = require('mysql');
const {promisify} = require('util');
const {database}= require('./keys');

const pool = msyql.createPool(database);
pool.getConnection((err, connection)=>{
    if(err){
        console.log('Ocurrió un error en la conexión de la base de datos')
    }
    if(connection){
        connection.release();
        console.log("DB is conected")
    }
    return;
});
pool.query = promisify(pool.query);
module.exports = pool;