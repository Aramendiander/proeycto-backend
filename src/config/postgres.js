import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Client, Pool } = pkg;
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: `localhost`,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

console.log(await pool.query('SELECT NOW()'))

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

await client.connect()

console.log(await client.query('SELECT NOW()'))

await client.end()