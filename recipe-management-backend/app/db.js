'use strict';
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const dbURL = "mongodb://localhost:27017/recipe";

if (!dbURL) {
  console.error('DB URL empty');
  process.exit(1);
}

async function connectToDB() {
  console.log(`Connecting to Database ${dbURL}`);

  try {
    await mongoose.connect(dbURL);
    console.log('Successfully Connected To DB');
  } catch (error) {
    console.error('Database Connection Failed');
    process.exit(1);
  }
}

connectToDB();

const db = mongoose.connection;
module.exports = db;
