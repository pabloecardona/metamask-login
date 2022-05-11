require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");

const {MONGO_DB_URI} = process.env

app.use(cors());
app.use(express.json());

let database, collection;

const client = new MongoClient(MONGO_DB_URI);

//Endpoints
app.post('/api/accounts', async (request, response) => {
  const {number, balance} = request.body

  if (!number) {
    return response.status(400).json({
      error: "address is missing",
    });
  }

  const account = {
    address: number,
    balance: balance
  }

  const filter = { address: number };
  const options = { upsert: true };
  const updateDoc = {
      $set: account,
    };
  
  try {
    //update existing account or create if not exists
    const result = await collection.updateOne(filter, updateDoc, options);
    response.status(201).json(account)

  } catch (error) {
    console.log(error);
  }
})

const PORT = 3001;

const server = app.listen(PORT, async (err) => {
  if(err){
    console.log(err);
    process.exit(1);
  }

  await client.connect();
  console.log('database connected');
  database = client.db('accountsDB');
  collection = database.collection('accounts');

  console.log(`Server running on port ${PORT}`);
});