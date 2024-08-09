'use strict';

const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const getRequiredFieldMessage = (field) => {
  const message = `${field} Should Not Be Empty`;
  return [true, message];
};

const RecipeSchema = new Schema(
  {
    id: { type: String, default: uuid, unique: true },
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      required: getRequiredFieldMessage('title'),
      trim: true,
    },
    category: {
      type: String,
      required: getRequiredFieldMessage('category'),
      trim: true,
    },
    ingredients: [String],
    instructions: [String],
    date: {
      type: String,
      required: getRequiredFieldMessage('date'),
      trim: true,
    },
    imageURL: {
      type: String,
      required: getRequiredFieldMessage('imageURL'),
      trim: true,
    },
  },
  options,
);

module.exports = mongoose.model('Recipe', RecipeSchema);
