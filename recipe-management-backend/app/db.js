'use strict';
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('DB URL empty');
  process.exit(1);
}

async function connectToDB() {
  console.log(`Connecting to Database ${MONGO_URI}`);

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Successfully Connected To DB');
  } catch (error) {
    console.error('Database Connection Failed');
    process.exit(1);
  }
}

connectToDB();

const db = mongoose.connection;
module.exports = db;
