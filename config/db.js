import mysql from 'mysql2/promise';

const pool  = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Ravi@123',
    database : 'test',
    waitForConnections : true,
    connectionLimit : 5,
    queueLimit : 0
})

const checkDbConnection = async() => {
    try{
        const connection = await pool.getConnection();
        console.log('database is a connected')
        connection.release()
    }catch(err){
        console.log('error in a database connection',err)
        process.exit(1)
    }
}

checkDbConnection();

export default pool;