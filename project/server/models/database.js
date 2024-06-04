const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'student',
}).promise()


async function getUsers() {
    const [rows] = await pool.query(`SELECT * FROM studentstbl`)
    return rows
}
async function getAccounts() {
    const [rows] = await pool.query(`SELECT * FROM accounts`)
    return rows
}


async function getUserbyID(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM studentstbl
    WHERE ID = ?
    `, [id])
    return rows[0]
}

async function create(Lname, Fname) {
    const result = await pool.query(`
    INSERT INTO studentstbl (Lastname, Firstname)
    VALUES (?,?)
    `, [Lname, Fname])
    return result
}

async function deleteByID(id) {
    const result = await pool.query(`
    DELETE FROM studentstbl
    WHERE ID = ?
    `, [id])
    return result
}

async function updateByID(id, fname, lname) {
    const result = await pool.query(`
    UPDATE studentstbl
    SET Firstname = '${fname}', Lastname = '${lname}' 
    WHERE ID = ${id};
    `, [fname], [lname], [id]);
    return result
}

module.exports = {
    getUsers,
    getUserbyID,
    create,
    deleteByID,
    updateByID,
    getAccounts
};