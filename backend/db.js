const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"1502",
    host:"localhost",
    port:5432,
    database:"me_zaubacorp"
});

module.exports = pool;