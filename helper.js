/*
* @author Shashank Tiwari
* did you mean using Nodejs
*/
'use strict';
const mysql = require('mysql');

class Helper {

    constructor() {

        this.pool = mysql.createPool({
            connectionLimit: 100,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'testing',
            debug: false
        });
    }

    getSuggestion(key,callback){
        this.pool.getConnection( (err, connection) => {
            if (err) {
                callback({ "error": true });
            }

            connection.query("SELECT title FROM articles WHERE title LIKE '%" + key +"%'", (err, rows) => {
                if (!err) {
                    callback({"error":false,"rows":rows});
                }
            });

            connection.on('error',  (err) => {
                callback({ "error": true });
            });
        });
    }

}

module.exports = new Helper();
