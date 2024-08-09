const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Recipe = require('../models/recipe');
const User = require('../models/user');

const SECRET_KEY = process.env.SECRET_KEY;

const resolvers = {
  Query: {
    recipesByUser: async (parent, args, context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }     
      const recipes = await Recipe.find({ userId: args.userId })
        .sort({ createdAt: -1 });
      return recipes || [];
    },
    recipe: async (parent, { id }) => {
      try {
        const recipe = await Recipe.findOne({ id });
        if (!recipe) {
          throw new Error('Recipe not found');
        }
        return recipe;
      } catch (error) {
        throw new Error(`Failed to fetch recipe: ${error.message}`);
      }
    },
    recipesByCategory: async (_, { userId, category }, context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      if (userId !== context.user.id) {
        throw new Error('Not authorized to access recipes for this user');
      }
      const filter = { userId: context.user.id };
      if (category) {
        filter.category = category;
      }
      return await Recipe.find(filter);
    },
  },

  Mutation: {
    register: async (parent, { input }) => {
      const { firstname, lastname, userName, email, password } = input;
      const existingUser = await User.findOne({ userName });
      const existingEmail = await User.findOne({ email });
      if (existingUser || existingEmail) {
        throw new Error('Username or email already exists');
      }    
      const user = new User({ firstname, lastname, userName, email, password });   
      console.log("User: ", user);  
      await user.save();
      return {
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          userName: user.userName,
          email: user.email,
        },
        statusCode: 200,
        status: true,
      };
    },

    login: async (parent, { input }) => {
      const { userName, password } = input;
      const user = await User.findOne({ userName });
      if (!user) {
        throw new Error('Invalid username or password');
      }     
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid username or password');
      }
      const token = jwt.sign(
        { id: user.id, userName: user.userName, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
      return {
        user: {
          id: user.id,
          userName: user.userName,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
        userToken: token,
        statusCode: 200,
        status: true,
      };
    },

    addRecipe: async (parent, { input }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const newRecipe = new Recipe({ ...input, userId: context.user.id });
      await newRecipe.save();
      return newRecipe;
    },
    editRecipe: async (parent, { id, input }, context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      const recipe = await Recipe.findOne({ id });
      if (!recipe) {
        throw new Error('Recipe not found');
      }
      if (recipe.userId !== context.user.id) {
        throw new Error('Not authorized to edit this recipe');
      }
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { id },
        { ...input },
        { new: true }
      );
      if (!updatedRecipe) {
        throw new Error('Failed to update recipe');
      }
      return updatedRecipe;
    },
    deleteRecipe: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      const result = await Recipe.deleteOne({ id });
      if (result.deletedCount === 0) {
        throw new Error('Recipe not found');
      }
      return true;
    },
  },
};

module.exports = resolvers;
