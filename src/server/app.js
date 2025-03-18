require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./router/router"); 

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());  

app.use("/api", routes); 


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
