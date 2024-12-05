// Week18-Activity26-Solved - we didint think we needed it
import { Schema, model, Document } from 'mongoose';

// Define an interface for the User document
interface IRecipe extends Document {
  recipeName: string;
  recipeAuthor: Schema.Types.ObjectId;
  servingSize: string;
  ingredients: string[];
  instructions: string[];
}

// Define the schema for the Recipe document
const recipeSchema = new Schema<IRecipe>(
  {
    recipeName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    recipeAuthor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: false,
    },
    servingSize: {
      type: String,
      required: true,
      unique: false,
    },
    ingredients: [{
      type: String,
      required: true,
      unique: false,
      trim: true,
    }],
    instructions: [{
      type: String,
      required: true,
      unique: false,
    }]
  }
);

const Recipe = model<IRecipe>('Recipe', recipeSchema);

export default Recipe;
