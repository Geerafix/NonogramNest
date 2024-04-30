import pg from 'pg';
const { Client } = pg;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 4001,
    password: "admin",
    database: "test-db"
});

client.connect();

client.query('SELECT * FROM person WHERE age IN (21) ', (err, res) => {
    if (!err) {
        console.log(res.rows);
    }
});