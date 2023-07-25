const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://pi:678041577pP_p1h2g3pablo@cluster0.maizixh.mongodb.net/?retryWrites=true&w=majority";

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

  collection = client.db("FULL").collection("users");
}

connect();

app.post("/auth", async function (req, res) {
  const streamkey = req.body.key;
  const username = req.body.username;
  const name = req.body.name;

try {
  const userStreamkey = await collection.findOne({username: username});

  if (streamkey === userStreamkey.streamKey) {
    await db.collection("streams").insertOne({username: username, name: name});

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