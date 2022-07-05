const { response } = require('express');
const { request } = require('express');
const {Client} = require('pg');
const { database } = require('pg/lib/defaults');
const client = new Client({ //process.env.DB_URL
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "suppmice.tk",
    database: "postgres"
});

client.connect();

// client.query(`SELECT * FROM users`,  (err, res) => {
// if(!err) {
//     console.log(res.rows);
// } else {
//     console.log(err.message);
// }
// // client.end;
// });
module.exports = client;