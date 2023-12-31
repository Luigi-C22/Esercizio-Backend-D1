const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = 5050;


const app = express();


//middleware

app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Errore di connessione:"));
db.once("open", ()=> {
    console.log(`Database MongoDB collegato sulla porta ${PORT}`);
});


//ultima riga
app.listen(PORT, ()=>
 console.log(`Server avviato e in ascolto sulla ${PORT}`)
 );