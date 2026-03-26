const express = require("express");
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    await client.connect();
    const result = await client.query("SELECT NOW()");
    await client.end();

    res.send(`App rodando. Banco conectado. Hora: ${result.rows[0].now}`);
  } catch (error) {
    res.status(500).send("Erro: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});