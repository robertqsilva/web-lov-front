require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./router/router"); 

const app = express();
const corsOptions = {
  origin: "*", // Permitir todas as origens
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "X-Requested-With"], // Cabeçalhos permitidos
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));  

app.use("/api", routes); 


const port = process.env.PORT || 3000;
app.listen(80, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
