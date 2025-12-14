const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'warehouse_db',
  password: 'mohsoo', // change this
  port: 5432,
});
// {
//   "ssh": "Disabled",
//   "previewLimit": 50,
//   "server": "localhost",
//   "port": 5432,
//   "driver": "PostgreSQL",
//   "name": "local warehouse",
//   "database": "warehouse_db",
//   "username": "postgres",
//   "password": "mohsoo"
// }

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Database connected successfully!');
});

module.exports = pool;
