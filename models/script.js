var mysql = require("mysql")

var connection = mysql.createConnection ({
    host: "localhost",

    port: 3000,

    user:"root",

    password: "root",
    database: "daily_stocksDB"

});

