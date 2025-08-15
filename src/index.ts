import dotenv from "dotenv";
import express from "express";
import "./connection.ts"

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Servidor a rodar!");
});

dotenv.config();
