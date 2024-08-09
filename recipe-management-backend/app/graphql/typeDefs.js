const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    userName: String!
    email: String!
  }

  type AuthResponse {
    user: User
    userToken: String
    statusCode: Int!
    status: Boolean!
  }

  input RegisterInput {
    firstname: String!
    lastname: String!
    userName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    userName: String!
    password: String!
  }

  type Recipe {
    id: ID!
    title: String!
    category: String!
    ingredients: [String!]!
    instructions: [String!]!
    date: String!
    imageURL: String!
    userId: String!
  }

  input RecipeInput {
    title: String!
    category: String!
    ingredients: [String!]!
    instructions: [String!]!
    date: String!   
    imageURL: String! 
  }

  type Query {
    recipesByUser(userId: String!): [Recipe!]!
    recipe(id: ID!): Recipe
    recipesByCategory(userId: ID!, category: String): [Recipe]
  }

  type Mutation {
    register(input: RegisterInput!): AuthResponse!
    login(input: LoginInput!): AuthResponse!
    addRecipe(input: RecipeInput!): Recipe!
    editRecipe(id: ID!, input: RecipeInput!): Recipe!
    deleteRecipe(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
