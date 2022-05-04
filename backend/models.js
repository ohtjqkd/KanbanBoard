var pg = require('pg');
var sq = require('sequelize');
require('dotenv').config();

const dbconfig = {
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PW, 
     database: process.env.DB_NAME, 
     port: process.env.DB_PORT, 
     ssl: { rejectUnauthorized: false } 
} 
const client = new pg.Client(dbconfig) 
client.connect(err => {
    if (err) {
        console.log('Failed to connect db ' + err) 
    } else {
        console.log('Connect to db done!') 
    }
})

module.exports.models;