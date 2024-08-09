const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./app/graphql/typeDefs');
const resolvers = require('./app/graphql/resolvers');
const context = require('./app/graphql/context');
const express = require('express');
const app = express();

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context,
    });

    return server;
};

// Start Apollo Server 
const start = async () => {
    const server = await startServer();
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: process.env.GRAPHQL_PORT }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
};

start();

module.exports = startServer;
