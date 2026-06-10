const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "myapp"
});
pool.getConnection((err, connection) => {
    if(err){
        console.log("Database Connection Failed");
    }
    else{
        console.log("Database Connected");
        connection.release();
    }
});
console.log("Connected Database:", "myapp");
module.exports = pool.promise();