// Week18-Activity26-Solved - we didint think we needed it
import { Schema, model, Document } from 'mongoose';

// Define an interface for the User document
interface IRecipe extends Document {
  recipeName: string;
  recipeAuthor: Schema.Types.ObjectId;
  recipeDescription: string;
  servingSize: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

// Define the schema for the Recipe document
const recipeSchema = new Schema<IRecipe>(
  {
    recipeName: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    recipeAuthor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      unique: false,
    },
    recipeDescription: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    servingSize: {
      type: String,
      required: false,
      unique: false,
    },
    ingredients: [{
      type: String,
      required: false,
      unique: false,
      trim: true,
    }],
    instructions: [{
      type: String,
      required: false,
      unique: false,
    }],
    tags: [{
      type: String,
      required: false,
      unique: false,
      trim: true,
    }]
  }
);

const Recipe = model<IRecipe>('Recipe', recipeSchema);

export default Recipe;