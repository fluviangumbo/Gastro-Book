// Week18-Activity26-Solved - we didint think we needed it
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the User document
interface IRecipe extends Document {
  recipeName: string;
  recipeAuthor: string;
  servingSize: String;
  ingredients: string;
  instructions: string;
  
  recipe: Schema.Types.ObjectId[];
  
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
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    servingSize: {
      type: String,
      required: true,
      unique: false,
    },
    ingredients: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    instructions: {
      type: String,
      required: true,
      unique: false,
    },
    recipe: [{
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
    }],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

recipeSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const Recipe = model<IRecipe>('Recipe', recipeSchema);

export default Recipe;
