const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://fullglobaltech:gbjY7H9OD8Kjh8cE@full.wn7m584.mongodb.net/?retryWrites=true&w=majority";

app.use(express.urlencoded());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection = "";

let db = "";

async function connect(){
  try {
    await client.connect();
    console.log("Conectado a la base de datos");
  }
  catch (err) {
    console.log(err.stack);
  }

  db = client.db("FULL");

  collection = client.db("FULL").collection("User");
}

connect();

app.post("/auth", async function (req, res) {
  const streamkey = req.body.key;
  const username = req.body.username;
  
try {
  const userStreamkey = await collection.findOne({user: username});

  if (streamkey === userStreamkey.streamKey) {
    res.status(200).send();
    return;
  }
}
catch (err) {
  console.log(err.stack);
}

  res.status(403).send();
});

app.listen(8000, function () {
  console.log("Escuchando en el puerto 8000");
});


//Para que estp funcione docker-compose build
//Y luego docker-compose up varias veces y ya va